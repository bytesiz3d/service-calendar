import { Day } from "@/common";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStartDateStore = defineStore("startDate", () => {
  const startDate = ref("2022-11-21");

  function update(day: string | number | Date) {
    const d = new Day(day);

    if (startDate.value !== d.toString())
      startDate.value = d.toString();
  }

  function $reset() {
    startDate.value = "2022-11-21";
  }

  return { startDate, update, $reset };
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
