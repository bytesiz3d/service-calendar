import { defineStore } from 'pinia';
import { ref } from 'vue';

interface DateParts
{
	year?: number
	month?: number
	day?: number
}

export const useSearchDateStore = defineStore('searchDate', () => {
	const searchDate = ref(Date.today());

	function update(date: Date | DateParts) {
		let d: Date;

		if (date instanceof Date) {
			d = new Date(date);
		} else  {
			const { year, month, day } = date;
			d = new Date(searchDate.value);

			if (year) d.setFullYear(year);
			if (month) d.setMonth(month);
			if (day) d.setDate(day);
		}

		d.setHours(0, 0, 0, 0);
		searchDate.value = d;
	}

	function $reset() {
		searchDate.value = Date.today();
	}

	return { searchDate, update, $reset };
})