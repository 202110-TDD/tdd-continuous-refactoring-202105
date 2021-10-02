import dayjs from "dayjs";
import {Budget} from "../src/budget";
import {Period} from "../src/period";

export class BudgetService {

    query(start, end) {
        let period = new Period(dayjs(start), dayjs(end));

        return this.getAll()
            .map(b => {
                return Budget.from(b).overlappingAmount(period);
            })
            .reduce((x, y) => x + y, 0);

    }

}
