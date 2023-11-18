import { Day } from "@/common";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useDateRangeStore = defineStore("dateRange", () => {
  const dateRange = ref(["2022-11-21", "2023-11-27"]);

  const START = computed(() => new Day(dateRange.value[0]))
  const END = computed(() => new Day(dateRange.value[1]))

  const weeksLeft = computed(() => Math.ceil(END.value.weekDifference(Day.today())/ 2))
  const weeksTotal = computed(() => Math.ceil(END.value.weekDifference(START.value)/ 2))

  function $reset() {
    dateRange.value = ["2022-11-21", "2023-11-27"];
  }

  return { dateRange, START, END, weeksLeft, weeksTotal, $reset };
});

export const useSearchDateStore = defineStore("searchDate", () => {
  const searchDate = ref(Day.today().toString());

  function update(day: Day | string) {
    const d = new Day(day);

    if (searchDate.value !== d.toString())
      searchDate.value = d.toString();
  }

  function $reset() {
    searchDate.value = Day.today().toString();
  }

  return { searchDate, update, $reset };
});
