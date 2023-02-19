<script setup lang="ts">
import CalendarMonth from "@/components/CalendarMonth.vue";
import { FirstDayOfEachMonthGenerator, DATES } from "@/common";
import { onMounted } from "vue";
import { useSearchDateStore } from "@/store";

const searchDate = useSearchDateStore();

function scrollToDate(date: Date) {
  const day_id = date.toDateString();
  const day_element = document.getElementById(day_id);
  day_element?.scrollIntoView({ block: "center", inline: "nearest" });
}

onMounted(() => scrollToDate(searchDate.searchDate));
searchDate.$subscribe((_, { searchDate }) => scrollToDate(searchDate));

const firstDayOfEachMonth = new FirstDayOfEachMonthGenerator(
  DATES.start,
  DATES.end
);
</script>

<template>
  <div class="container">
    <CalendarMonth
      v-for="day in firstDayOfEachMonth.gen()"
      class="my-5"
      :first-day-of-month="day"
    />
  </div>
</template>
