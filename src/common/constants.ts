export const DAYS_IN_WEEK = 7;
export const MONTHS_IN_YEAR = 12;

export class DATES {
  static get end(): Date {
    return Date.fromParts({year: 2023, month: 10, day: 25});
  }
}