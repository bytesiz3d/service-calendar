<script setup lang="ts">
import {
  YearsInRangeGenerator,
  MonthTextAndValueGenerator,
  DayNumbersOfMonthGenerator,
  DATES,
} from "@/common";
import { reactive, computed, watch } from "vue";
import { useSearchDateStore } from "@/store";
import { storeToRefs } from "pinia";

const searchStore = useSearchDateStore();
const { searchDate: searchRef } = storeToRefs(searchStore);

const dateParts = reactive(searchRef.value.toParts());

watch(dateParts, searchStore.update);
searchStore.$subscribe((_, { searchDate }) => {
  if (Date.fromParts(dateParts) != searchDate) {
    const { year, month, day } = searchDate.toParts();
    dateParts.year = year;
    dateParts.month = month;
    dateParts.day = day;
  }
});

const dayIsFree = computed(
  () => !searchRef.value.matchesAlternatingWeeks(DATES.start)
);

const years = computed(() => {
  const year = searchRef.value.getFullYear();
  return new YearsInRangeGenerator(year);
});
const months = new MonthTextAndValueGenerator();
const days = computed(() => {
  const { year, month, day } = searchRef.value.toParts();
  const d = new Date(year, month, day, 0, 0, 0, 0);
  return new DayNumbersOfMonthGenerator(d);
});
</script>

<template>
  <div class="grid" style="--bs-gap: 0.5em">
    <div class="grid g-col-9">
      <select
        name="Year"
        class="form-select form-select-sm g-col-4"
        v-model.number="dateParts.year"
      >
        <option v-for="year in years.gen()">{{ year }}</option>
      </select>
      <select
        name="Month"
        class="form-select form-select-sm g-col-5"
        v-model="dateParts.month"
      >
        <option v-for="month in months.gen()" :value="month.value">
          {{ month.text }}
        </option>
      </select>
      <select
        name="Day"
        class="form-select form-select-sm g-col-3"
        v-model.number="dateParts.day"
      >
        <option v-for="day in days.gen()">{{ day }}</option>
      </select>
    </div>

    <div class="form-check form-switch d-flex align-items-center">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        :checked="dayIsFree"
        disabled
      />
    </div>

    <button
      class="btn btn-sm btn-outline-success g-col-2"
      @click="searchStore.update(Date.today())"
    >
      Today
    </button>
  </div>
</template>

<style scoped></style>
