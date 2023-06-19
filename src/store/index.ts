import { defineStore } from "pinia";
import { ref } from "vue";

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
