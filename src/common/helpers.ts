import { Day } from "./Day";
import { DAYS_IN_WEEK } from "./constants";

export interface IGenerator<T> {
  gen(): Generator<T, void, unknown>;
}

export class FirstDayOfEachMonthGenerator implements IGenerator<Day> {
  private day: Day;
  private endDay: Day;

  constructor(day: Day, endDay: Day) {
    this.day = new Day(day);
    this.endDay = new Day(endDay);
    this.day.setDate(1);
  }

  *gen() {
    for (let m = 0; true; m++) {
      let firstDayOfNextMonth = new Day(this.day);
      firstDayOfNextMonth.setMonth(this.day.getMonth() + m);

      if (firstDayOfNextMonth > this.endDay) break;
      yield firstDayOfNextMonth;
    }
  }
}

export class DaysOfMonthGenerator implements IGenerator<Day> {
  private day: Day;

  constructor(day: Day) {
    this.day = new Day(day);
  }

  *gen() {
    const count_days_in_month = this.day.daysInMonth();
    for (let day = 1; day <= count_days_in_month; day++) {
      this.day.setDate(day);
      yield new Day(this.day);
    }
  }
}

export class DayNumbersOfMonthGenerator implements IGenerator<number> {
  private daysOfMonth: IGenerator<Day>;
  constructor(day: Day) {
    this.daysOfMonth = new DaysOfMonthGenerator(day);
  }

  *gen() {
    for (let day of this.daysOfMonth.gen()) {
      yield day.getDate();
    }
  }
}

export class WeekdaysGenerator implements IGenerator<string> {
  private day: Day;

  constructor(day: Day) {
    this.day = new Day(day);
  }

  *gen() {
    for (let d = 0; d < DAYS_IN_WEEK; d++) {
      let day = new Day(this.day);
      day.setDate(day.getDate() + d);
      yield day.toLocaleString("default", { weekday: "short" });
    }
  }
}