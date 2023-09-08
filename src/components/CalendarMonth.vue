<script setup lang="ts">
import CalendarDay from "@/components/CalendarDay.vue";
import {
  DaysOfMonthGenerator,
  WeekdaysGenerator,
  DATES,
  DAYS_IN_WEEK,
  Day,
} from "@/common";
import { computed, type StyleValue } from "vue";
import { useStartDateStore } from "@/store";
import { storeToRefs } from "pinia";

const { firstDayOfMonth } = defineProps<{
  firstDayOfMonth: Day;
}>();

const startStore = useStartDateStore();
const { startDate: startRef } = storeToRefs(startStore);
const startDate = computed(() => new Day(startRef.value));

const weekdays = new WeekdaysGenerator(startDate.value);
const daysOfMonth = new DaysOfMonthGenerator(firstDayOfMonth);

function getGridColumnStartForWeekDay(
  day: Day,
  startDay: Day
): { gridColumnStart?: number } {
  let offset = day.getWeekdayOffset(startDay.getDay());
  if (offset == 0) return {};

  return { gridColumnStart: offset + 1 };
}

function styleMonth(): StyleValue {
  return {
    "--bs-columns": DAYS_IN_WEEK,
    "--bs-gap": 0,
  };
}

function styleDay(day: Day): StyleValue {
  return {
    ...getGridColumnStartForWeekDay(day, startDate.value),
  };
}

function dayShouldBeMarked(day: Day): boolean {
  return (
    day.matchesAlternatingWeeks(startDate.value) &&
    day.isInBounds(startDate.value, DATES.end)
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
