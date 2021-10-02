export class Period {
    startDay;
    endDay;

    constructor(startDay, endDay) {
        this.startDay = startDay;
        this.endDay = endDay;

    }

    overlappingDays(budget) {
        let overlappingEnd = budget.lastDay().isBefore(this.endDay)
            ? budget.lastDay()
            : this.endDay;
        let overlappingStart;
        if (budget.firstDay().isSame(this.startDay, "month")) {
            overlappingStart = this.startDay;
        } else if (budget.lastDay().isSame(this.endDay, "month")) {
            // overlappingEnd = budget.lastDay().isBefore(this.endDay)
            //     ? budget.lastDay()
            //     : this.endDay;
            overlappingStart = budget.firstDay();
        } else {
            // overlappingEnd = budget.lastDay().isBefore(this.endDay)
            //     ? budget.lastDay()
            //     : this.endDay;
            overlappingStart = budget.firstDay();
        }
        return overlappingEnd.diff(overlappingStart, "day") + 1;
    }
}