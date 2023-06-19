<script setup lang="ts">
import CalendarMonth from "@/components/CalendarMonth.vue";
import { FirstDayOfEachMonthGenerator, DATES } from "@/common";
import { onMounted } from "vue";
import { useSearchDateStore } from "@/store";
import { Carousel } from "bootstrap";

const { useCarousel } = defineProps<{ useCarousel: boolean }>();
const searchDate = useSearchDateStore();
const startDate = await DATES.start;

function scrollToDate(dateString: string) {
  if (useCarousel)
  {
    const carouselElement = document.querySelector('#monthCarousel');
    const carousel = new Carousel(carouselElement ?? "");
    carousel.to(new Date(dateString).getMonth() - startDate.getMonth());
  }
  else
  {
    const day_element = document.getElementById(dateString);
    day_element?.scrollIntoView({ block: "center", inline: "nearest" });
  }
}

onMounted(() => scrollToDate(searchDate.searchDate));
searchDate.$subscribe((_, { searchDate }) => scrollToDate(searchDate));

const firstDayOfEachMonth = new FirstDayOfEachMonthGenerator(
  startDate,
  DATES.end
);
</script>

<template>
  <div class="container" v-if="useCarousel == false">
    <CalendarMonth
      v-for="day in firstDayOfEachMonth.gen()"
      class="my-5"
      :first-day-of-month="day"
    />
  </div>

  <div id="monthCarousel" class="carousel carousel-dark slide container" v-else>
    <div class="carousel-inner">
      <CalendarMonth
        v-for="(day, index) in firstDayOfEachMonth.gen()"
        class="carousel-item my-5"
        :class="{ active: index == 0 }"
        style="padding-left: 10%; padding-right: 10%;"
        :first-day-of-month="day"
      />
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
