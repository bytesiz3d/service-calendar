import { Day } from "./Day";

export const DAYS_IN_WEEK = 7;
export const MONTHS_IN_YEAR = 12;

export class DATES {
  static get end(): Day {
    return new Day("2023-11-27");
  }
}