<script setup lang="ts">
import CalendarDay from '@/components/CalendarDay.vue';
import { DAYS_IN_WEEK, DaysOfMonthGenerator, WeekdaysGenerator, datesMatchAlternatingWeeks, getMonthAndYearString, getDayOffsetOneBased } from '@/common/helpers'

const { firstDayOfMonth, startDate } = defineProps<{
	firstDayOfMonth: Date,
	startDate: Date;
}>()

const weekdays = new WeekdaysGenerator(startDate);
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
				class="w-100" :style="{ ...getDayOffsetOneBased(day, startDate) }"
				:day="day" :marked="datesMatchAlternatingWeeks(day, startDate)" />
		</div>
	</div>
</template>

<style scoped>
</style>