import dayjs from "dayjs";
import {Budget} from "../src/budget";

export class BudgetService {

    query(start, end) {
        let startDay = dayjs(start);
        let endDay = dayjs(end);
        if (endDay.isBefore(startDay)) {
            return 0;
        }
        if (startDay.isSame(endDay, "month")) {
            return (this.getAll()?.find(element => element.yearMonth === startDay.format("YYYYMM"))?.amount || 0) / startDay.daysInMonth() * (endDay.diff(startDay, "day") + 1);
        }
        let sum = 0;
        for (let currentMonth = startDay.startOf("month");
             currentMonth.isBefore(endDay.add(1, 'month').startOf('month'));
             currentMonth = currentMonth.add(1, "month")) {
            let month = currentMonth.format("YYYYMM");
            let budget = Budget.from(this.getAll()?.find(element => element.yearMonth === month));
            if (budget) {
                if (currentMonth.isSame(startDay, "month")) {
                    let overlappingDays = startDay.endOf("month").diff(startDay, "day") + 1;
                    sum += budget.dailyAmount() * overlappingDays;
                } else if (currentMonth.isSame(endDay, "month")) {
                    let overlappingDays = endDay.diff(endDay.startOf("month"), "day") + 1;
                    sum += budget.dailyAmount() * overlappingDays;
                } else {
                    sum += budget.amount;
                }
            }
        }
        return sum;
    }

}
