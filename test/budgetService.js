import dayjs from "dayjs";
import {Budget} from "../src/budget";
import {Period} from "../src/period";

export class BudgetService {

    query(start, end) {
        // let sum = 0;
        let period = new Period(dayjs(start), dayjs(end));

        return this.getAll()
            .map(b => {
                let budget = Budget.from(b);
                return budget.overlappingAmount(period);
            })
            .reduce((x, y) => x + y, 0);

        // .forEach(b => {
        //     let budget = Budget.from(b);
        //     sum += budget.overlappingAmount(period);
        // });
        // return sum;
    }

}
