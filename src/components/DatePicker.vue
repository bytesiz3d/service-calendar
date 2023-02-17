<script setup lang="ts">
import { YearsInRangeGenerator, MonthNamesGenerator, DayNumbersOfMonthGenerator } from '@/common';
import { reactive, computed, watch } from 'vue';
import { useSearchDateStore } from '@/store';

const { searchDate, update: updateSearchDate } = useSearchDateStore();

const dateParts = reactive({
	year: searchDate.getFullYear(),
	month: searchDate.getMonth(),
	day: searchDate.getDate()
});

watch(dateParts, ({ year, month, day }) => {
	const d = new Date(year, month, day, 0, 0, 0, 0);
})

function updateToToday() { // FIXME: 3 EVENTS
	const today = Date.today();
	dateParts.year = today.getFullYear();
	dateParts.month = today.getMonth();
	dateParts.day = today.getDate();
}

const years = computed(() => {
	const year = date.getFullYear();
	return new YearsInRangeGenerator(year);
});
const months = new MonthNamesGenerator();
const days = computed(() => {
	const { year, month, day } = dateParts;
	const d = new Date(year, month, day);
	return new DayNumbersOfMonthGenerator(d);
});

</script>

<template>
	<div class="grid" style="--bs-gap: 0.5em">
		<div class="grid g-col-10 me-3">
			<select name="Year" class="form-select g-col-3" v-model="dateParts.year">
				<option v-for="year in years.gen()">{{ year }}</option>
			</select>
			<select name="Month" class="form-select g-col-6" v-model="dateParts.month">
				<option v-for="month in months.gen()" :value="month.value">{{ month.text }}</option>
			</select>
			<select name="Day" class="form-select g-col-3" v-model="dateParts.day">
				<option v-for="day in days.gen()">{{ day }}</option>
			</select>
		</div>

		<button class="btn btn-outline-success g-col-2" @click="updateToToday">Today</button>
	</div>
</template>

<style scoped></style>
