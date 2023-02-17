import { DAYS_IN_WEEK } from "./constants";

export interface IGenerator<T> {
	gen(): Generator<T, void, unknown>
}

export class FirstDayOfEachMonthGenerator implements IGenerator<Date> {
	private day: Date
	private endDay: Date

	constructor(day: Date, endDay: Date) {
		this.day = new Date(day);
		this.endDay = new Date(endDay);
		this.day.setDate(1);
	}

	*gen() {
		for (let m = 0; true; m++)
		{
			let firstDayOfNextMonth = new Date(this.day);
			firstDayOfNextMonth.setMonth(this.day.getMonth() + m);

			if (firstDayOfNextMonth > this.endDay) break;
			yield firstDayOfNextMonth;
		}
	}
}

export class DaysOfMonthGenerator implements IGenerator<Date> {
	private day: Date

	constructor(day: Date) {
		this.day = new Date(day);
	}

	*gen() {
		const year = this.day.getFullYear();
		const month = this.day.getMonth();

		const count_days_in_month = this.day.daysInMonth();
		for (let d = 1; d <= count_days_in_month; d++)
			yield new Date(year, month, d);
	}
}

export class WeekdaysGenerator implements IGenerator<string> {
	private day: Date;

	constructor(day: Date) {
		this.day = new Date(day);
	}

	*gen() {
		for (let d = 0; d < 7; d++) {
			let day = new Date(this.day);
			day.setDate(day.getDate() + d);
			yield day.toLocaleString('default', { 'weekday': 'short' });
		}
	}
}