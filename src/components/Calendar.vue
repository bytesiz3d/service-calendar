<script setup lang="ts">
import CalendarMonth from "@/components/CalendarMonth.vue";
import { FirstDayOfEachMonthGenerator, DATES, Day } from "@/common";
import { computed, onMounted } from "vue";
import { useSearchDateStore, useStartDateStore } from "@/store";
import { storeToRefs } from "pinia";

const { useCarousel } = defineProps<{ useCarousel: boolean }>();

const searchStore = useSearchDateStore();
const { searchDate: searchRef } = storeToRefs(searchStore);
const searchDate = computed(() => new Day(searchRef.value));

const startStore = useStartDateStore();
const { startDate: startRef } = storeToRefs(startStore);
const startDate = computed(() => new Day(startRef.value));

function scrollToDate(dateString: string) {
  const day_element = document.getElementById(dateString);
  day_element?.scrollIntoView({ block: "center", inline: "nearest" });
}

const scrollToCarouselIndex = computed(() => {
  const gen = new FirstDayOfEachMonthGenerator(startDate.value, DATES.end);

  return [...gen.gen()]
    .findIndex((firstDay: Day) => firstDay.getFullYear() == searchDate.value.getFullYear()
      && firstDay.getMonth() == searchDate.value.getMonth());
});

onMounted(() => scrollToDate(searchStore.searchDate));
searchStore.$subscribe((_, { searchDate }) => scrollToDate(searchDate));

const firstDayOfEachMonth = new FirstDayOfEachMonthGenerator(
  startDate.value,
  DATES.end
);
</script>

<template>
  <div class="container" v-if="useCarousel == false">
    <CalendarMonth v-for="day in firstDayOfEachMonth.gen()" class="my-5" :first-day-of-month="day" />
  </div>

  <div id="monthCarousel" class="carousel carousel-dark slide container" v-else>
    <div class="carousel-inner">
      <CalendarMonth v-for="(day, index) in firstDayOfEachMonth.gen()" class="carousel-item my-5"
        :class="{ active: index == scrollToCarouselIndex }" style="padding-left: 10%; padding-right: 10%;"
        :first-day-of-month="day" />
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#monthCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#monthCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>
