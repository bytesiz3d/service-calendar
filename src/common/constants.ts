export const DAYS_IN_WEEK = 7;
export const MONTHS_IN_YEAR = 12;
import { DB } from "@/common/DB"

export class DATES {
  static db: DB = new DB();

  static get start(): Promise<Date> {
    return DATES.db.getStartDate();
  }

  static get end(): Date {
    return new Date(2023, 10, 25, 0, 0, 0, 0);
  }
}
