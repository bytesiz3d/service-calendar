import { defineStore } from "pinia";
import { ref } from "vue";

export const useStartDateStore = defineStore("startDate", () => {
  const startDate = ref(Date.fromParts({year: 2023, month: 6, day: 3}).toDateString());

  function update(date: Date | string) {
    let d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    d = Date.fromParts({year, month, day});

    if (startDate.value !== d.toDateString())
      startDate.value = d.toDateString();
  }

  function $reset() {
    startDate.value = Date.today().toDateString();
  }

  return { startDate, update, $reset };
});

export const useSearchDateStore = defineStore("searchDate", () => {
  const searchDate = ref(Date.today().toDateString());

  function update(date: Date | string) {
    const d = new Date(date);

    if (searchDate.value !== d.toDateString())
      searchDate.value = d.toDateString();
  }

  function $reset() {
    searchDate.value = Date.today().toDateString();
  }

  return { searchDate, update, $reset };
});
