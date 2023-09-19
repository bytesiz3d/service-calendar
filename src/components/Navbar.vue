<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStartDateStore, useSearchDateStore } from "@/store";
import { DATES, Day } from "@/common";
import { computed } from "vue";

const { useCarousel } = defineProps<{ useCarousel: boolean }>();
const emit = defineEmits<{ (e: "update:useCarousel", value: boolean): void }>();

const searchStore = useSearchDateStore();
const { searchDate: searchRef } = storeToRefs(searchStore);

const startStore = useStartDateStore();
const { startDate: startRef } = storeToRefs(startStore);

function toggleCarousel(e: Event) {
  const check = e as unknown as { target: { checked: boolean } };
  emit("update:useCarousel", check.target.checked);
}

const dayIsFree = computed(
  () => !new Day(searchRef.value).matchesAlternatingWeeks(new Day(startRef.value))
);

const weeksLeft = computed(
  () => {
    const diff = DATES.end.weekDifference(Day.today());
    return Math.ceil(diff / 2);
  }
);

const weeksTotal = computed(
  () => {
    const diff = DATES.end.weekDifference(new Day(startRef.value));
    return Math.ceil(diff / 2);
  }
)

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top border-bottom">
    <div class="container-fluid" style="column-gap: .5rem;">
      <div class="navbar-brand fs-2"> Service Calendar </div>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <i class="navbar-toggler-icon"></i>
      </button>

      <div class="d-flex flex-wrap fs-5" style="column-gap: .5rem;">
        <div v-for="_ in weeksLeft">
          <i class="bi bi-calendar-week-fill text-primary"></i>
        </div>
        <div v-for="_ in weeksTotal - weeksLeft">
          <i class="bi bi-calendar-week-fill text-secondary"></i>
        </div>
        <div class="fw-bold">
          {{ weeksTotal - weeksLeft }} / {{ weeksTotal }}
        </div>
        <vue-countdown class="fs-6" :time="DATES.end.getTime() - Day.today().getTime()"
          v-slot="{ days, hours, minutes, seconds }">
          {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
        </vue-countdown>
      </div>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <div class="grid flex-grow-1" style="row-gap: 0.25rem; max-width: 600px;">
            <div class="input-group g-col-12 g-col-md-6">
              <i class="input-group-text bi bi-1-square"></i>
              <input id="startDate" type="date" class="form-control" v-model="startRef" />
            </div>

            <div class="input-group g-col-12 g-col-md-6">
              <i class="input-group-text bi bi-search"></i>
              <input id="searchDate" type="date" class="form-control" v-model="searchRef" />

              <span class="input-group-text">
                <i class="bi fs-4 lh-1" :class="[dayIsFree
                  ? ['bi-check-circle-fill', 'text-success']
                  : ['bi-x-circle-fill', 'text-danger']
                ]"/>
              </span>
            </div>

            <div class="form-check form-switch g-col-12">
              <input class="form-check-input" type="checkbox" role="switch" :checked="useCarousel" @change="toggleCarousel" />
              <label class="form-check-label fs-6">Compact</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
