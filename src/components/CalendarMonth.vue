<script setup lang="ts">
import CalendarDay from '@/components/CalendarDay.vue';
import { DaysOfMonthGenerator, WeekdaysGenerator, DATES, DAYS_IN_WEEK } from '@/common'
import type { StyleValue } from 'vue';

const { firstDayOfMonth } = defineProps<{
	firstDayOfMonth: Date,
}>()

const weekdays = new WeekdaysGenerator(DATES.start).gen();
const daysOfMonth = new DaysOfMonthGenerator(firstDayOfMonth).gen();

const monthStyle: StyleValue = {
	'--bs-columns': DAYS_IN_WEEK, '--bs-gap': 0
}

function getDayOffsetOneBased(day: Date, startDay: Date): { gridColumnStart?: number } {
	if (day.getDate() != 1) // not first day of the month
		return {};

	let offset = day.getDay() - startDay.getDay();
	if (offset < 0) offset += DAYS_IN_WEEK;

	return { gridColumnStart: offset + 1 };
}

</script>

<template>
	<div>
		<div class="text-center">
			<h1 class="mb-4">{{ firstDayOfMonth.toMonthAndYearString() }}</h1>
		</div>
		<div class="grid" :style="{...monthStyle}">
			<p v-for="weekday in weekdays" class="mb-1 text-center text-muted text-uppercase fw-bolder">
				{{ weekday }}
			</p>

			<CalendarDay v-for="day in daysOfMonth" class="w-100"
				:style="{ ...getDayOffsetOneBased(day, DATES.start) }" :day="day"
				:marked="day.matchesAlternatingWeeks(DATES.start) && day.isInBounds(DATES.start, DATES.end)" />
		</div>
	</div>
</template>

<style scoped></style>