export class Day extends Date {
  constructor(date?: string | number | Date) {
    if (date)
      super(date);
    else
      super();

    this.setMinutes(-this.getTimezoneOffset());
  }

  static today(): Day {
    return new Day();
  }

  toString(): string {
    return this.toISOString().substring(0, 10);
  }

  toMonthString(): string {
    return this.toLocaleString("default", {
      month: "long",
    });
  }

  toMonthAndYearString(): string {
    return this.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  }

  daysInMonth(): number {
    let d = new Day(+this);
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    return d.getDate();
  }

  isInBounds(begin: Day, end: Day): boolean {
    return begin <= this && this < end;
  }

  compareMS(day: Day): number {
    return this.getTime() - day.getTime();
  }

  weekDifference(day: Day): number {
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
    return Math.floor(this.compareMS(day) / ONE_WEEK_MS);
  }

  matchesAlternatingWeeks(day: Day): boolean {
    return this.weekDifference(day) % 2 == 0;
  }
}