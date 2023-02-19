<script setup lang="ts">
import CalendarDay from "@/components/CalendarDay.vue";
import {
  DaysOfMonthGenerator,
  WeekdaysGenerator,
  DATES,
  DAYS_IN_WEEK,
} from "@/common";
import type { StyleValue } from "vue";

const { firstDayOfMonth } = defineProps<{
  firstDayOfMonth: Date;
}>();

const weekdays = new WeekdaysGenerator(DATES.start);
const daysOfMonth = new DaysOfMonthGenerator(firstDayOfMonth);

function getWeekdayOffset(day: Date, weekday: number): number {
  if (day.getDate() != 1)
    // not first day of the month
    return 0;

  let offset = day.getDay() - weekday;
  if (offset < 0) offset += DAYS_IN_WEEK;

  return offset;
}

function getGridColumnStartForWeekDay(
  day: Date,
  startDay: Date
): { gridColumnStart?: number } {
  let offset = getWeekdayOffset(day, startDay.getDay());
  if (offset == 0) return {};

  return { gridColumnStart: offset + 1 };
}

function styleMonth(): StyleValue {
  return {
    "--bs-columns": DAYS_IN_WEEK,
    "--bs-gap": 0,
  };
}

function styleDay(day: Date): StyleValue {
  return {
    ...getGridColumnStartForWeekDay(day, DATES.start),
  };
}

function dayShouldBeMarked(day: Date): boolean {
  return (
    day.matchesAlternatingWeeks(DATES.start) &&
    day.isInBounds(DATES.start, DATES.end)
  );
}
</script>

<template>
  <div>
    <div class="text-center">
      <h1 class="mb-4">{{ firstDayOfMonth.toMonthAndYearString() }}</h1>
    </div>
    <div class="grid" :style="styleMonth()">
      <p
        v-for="weekday in weekdays.gen()"
        class="mb-1 text-center text-muted text-uppercase fw-bolder"
      >
        {{ weekday }}
      </p>

      <CalendarDay
        v-for="day in daysOfMonth.gen()"
        class="w-100"
        :style="styleDay(day)"
        :day="day"
        :marked="dayShouldBeMarked(day)"
      />
    </div>
  </div>
</template>

<style scoped></style>
