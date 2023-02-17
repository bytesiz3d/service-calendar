<script setup lang="ts">
import CalendarDay from '@/components/CalendarDay.vue';
import { DAYS_IN_WEEK, DaysOfMonthGenerator, WeekdaysGenerator, datesMatchAlternatingWeeks, getMonthAndYearString, getDayOffsetOneBased, dateInBounds, DATES } from '@/common/helpers'

const { firstDayOfMonth } = defineProps<{
	firstDayOfMonth: Date,
}>()

const weekdays = new WeekdaysGenerator(DATES.start);
const daysOfMonth = new DaysOfMonthGenerator(firstDayOfMonth);

</script>

<template>
	<div>
		<div class="text-center">
			<h1 class="mb-4">{{ getMonthAndYearString(firstDayOfMonth) }}</h1>
		</div>
		<div class="grid" :style="{ '--bs-columns': DAYS_IN_WEEK, '--bs-gap': 0 }">
			<p v-for="weekday in weekdays.gen()"
				class="mb-1 text-center text-muted text-uppercase fw-bolder">
				{{ weekday }}
			</p>

			<CalendarDay v-for="day in daysOfMonth.gen()"
				class="w-100" :style="{ ...getDayOffsetOneBased(day, DATES.start) }"
				:day="day" :marked="datesMatchAlternatingWeeks(day, DATES.start) && dateInBounds(day, DATES.start, DATES.end)" />
		</div>
	</div>
</template>

<style scoped>
</style>