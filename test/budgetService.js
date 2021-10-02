import dayjs from "dayjs";
import {Budget} from "../src/budget";
import {Period} from "../src/period";

export class BudgetService {

    query(start, end) {
        let startDay = dayjs(start);
        let endDay = dayjs(end);
        let sum = 0;
        let period = new Period(startDay, endDay);

        this.getAll().forEach(b => {
            let budget = Budget.from(b);
            sum += budget.dailyAmount() * period.overlappingDays(budget);
        });
        return sum;
    }

}
