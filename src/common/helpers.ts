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

		const count_days_in_month = getNumberOfDaysInMonth(this.day);
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

export const DAYS_IN_WEEK = 7;

export function compareDatesWithoutTimes(date_a: Date, date_b: Date): number {
	let d1 = new Date(date_a).setHours(0, 0, 0, 0);
	let d2 = new Date(date_b).setHours(0, 0, 0, 0);

	return d1 - d2;
}

export function getWeekDifference(date_a: Date, date_b: Date): number {
	let d1 = new Date(date_a).setHours(0, 0, 0, 0);
	let d2 = new Date(date_b).setHours(0, 0, 0, 0);

	return Math.floor((d1 - d2) / (7 * 24 * 60 * 60 * 1000));
}

export function datesMatchAlternatingWeeks(day_1: Date, day_2: Date): boolean {
	return getWeekDifference(day_1, day_2) % 2 == 0;
}

export function getIsoDateStringWithoutTime(date: Date): string {
	return date.toISOString().substring(0, 10);
}

export function getNumberOfDaysInMonth(date: Date): number {
	const year = date.getFullYear();
	const month = date.getMonth();
	return new Date(year, month + 1, 0).getDate();
}

export function getMonthAndYearString(date: Date): string {
	return date.toLocaleString('default', {
		'month': 'long',
		'year': 'numeric',
	})
}

export function getDayOffsetOneBased(day: Date, startDay: Date): { gridColumnStart?: number } {
	if (day.getDate() != 1) // not first day of the month
		return {};

	let offset = day.getDay() - startDay.getDay();
	if (offset < 0) offset += DAYS_IN_WEEK;

	return { gridColumnStart: offset + 1 };
}

export function dateInBounds(day: Date, start: Date, end: Date) {
	return day >= start && day < end;
}

export const DATES = {
	start: new Date(2022, 10, 24),
	end:   new Date(2023, 10, 25),
}