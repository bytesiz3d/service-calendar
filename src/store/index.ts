import type { DateParts } from "@/common/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchDateStore = defineStore("searchDate", () => {
  const searchDate = ref(Date.today());

  function update(date: Date | DateParts) {
    let d: Date;

    if (date instanceof Date) {
      d = new Date(date);
    } else {
      let year = date.year ?? searchDate.value.getFullYear();
      let month = date.month ?? searchDate.value.getMonth();
      let day = date.day ?? searchDate.value.getDate();
      day = Math.min(day, Date.daysInMonth(month));

      d = Date.fromParts({ year, month, day });
    }

    if (searchDate.value != d) searchDate.value = d;
  }

  function $reset() {
    searchDate.value = Date.today();
  }

  return { searchDate, update, $reset };
});
