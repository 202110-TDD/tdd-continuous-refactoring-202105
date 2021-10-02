import dayjs from "dayjs";

export class Budget {
    static from(json) {
        if (json) { return Object.assign(new Budget(), json);}
        return null;
    }

    dailyAmount() {
        return (this.amount) / this.totalDays();
    }

    lastDay() {
        return this.firstDay().endOf('month');
    }

    totalDays() {
        return this.firstDay().daysInMonth();
    }

    firstDay() {
        return dayjs(this.yearMonth + "01", "yyyyMMdd");
    }
}