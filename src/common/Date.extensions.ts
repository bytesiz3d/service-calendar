export {}

declare global {
	interface DateConstructor {
		today: () => Date
	}

	interface Date {
		daysInMonth(): number;
		toDateString(): string;
		toMonthAndYearString(): string;
		toMonthString(): string;
		isInBounds(begin: Date, end: Date): boolean;
		weekDifference(date: Date): number;
		matchesAlternatingWeeks(date: Date): boolean;
		compareDays(date: Date): number;
	}
}

Date.today = function (): Date {
	return new Date();
}

Date.prototype.daysInMonth = function (): number {
	const year = this.getFullYear();
	const month = this.getMonth();
	return new Date(year, month + 1, 0).getDate();
}

Date.prototype.toDateString = function (): string {
	return this.toISOString().substring(0, 10);
}

Date.prototype.toMonthAndYearString = function (): string {
	return this.toLocaleString('default', {
		'month': 'long',
		'year': 'numeric',
	})
}

Date.prototype.toMonthString = function (): string {
	return this.toLocaleString('default', {
		'month': 'long',
	})
}

Date.prototype.isInBounds = function (begin: Date, end: Date): boolean {
	return this >= begin && this < end;
}

Date.prototype.weekDifference = function (date: Date): number { 
	let d1 = new Date(this).setHours(0, 0, 0, 0);
	let d2 = new Date(date).setHours(0, 0, 0, 0);

	return Math.floor((d1 - d2) / (7 * 24 * 60 * 60 * 1000));
}

Date.prototype.matchesAlternatingWeeks = function (date: Date): boolean {
	return this.weekDifference(date) % 2 == 0;
}

Date.prototype.compareDays = function (date: Date): number {
	let d1 = new Date(this).setHours(0, 0, 0, 0);
	let d2 = new Date(date).setHours(0, 0, 0, 0);

	return d1 - d2;
}