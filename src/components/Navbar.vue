<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStartDateStore, useSearchDateStore } from "@/store";
import { DATES } from "@/common";
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
  () => !new Date(searchRef.value).matchesAlternatingWeeks(new Date(startRef.value))
);

const weeksLeft = computed(
  () => {
    const diff = DATES.end.weekDifference(Date.today());
    return Math.ceil(diff / 2);
  }
);

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top border-bottom">
    <div class="container-fluid">
      <div class="navbar-brand">
        <span class="fs-3 g-col-12 g-col-md-6"> Service Calendar </span>

        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" :checked="useCarousel" @change="toggleCarousel" />
          <label class="form-check-label fs-6">Compact</label>
        </div>

        <div class="d-flex g-col-12">
          <div v-for="_ in weeksLeft" class="me-2">
            <i class="bi bi-calendar-week-fill text-primary"></i>
          </div>
        </div>
      </div>

      <div class="grid align-items-center pe-2">
        <div class="input-group g-col-12 g-col-md-6">
          <i class="input-group-text bi bi-1-square"></i>
          <input id="startDate" type="date" class="form-control" v-model="startRef" />
        </div>

        <div class="input-group g-col-12 g-col-md-6">
          <i class="input-group-text bi bi-search"></i>
          <input id="searchDate" type="date" class="form-control" v-model="searchRef" />
          <div class="ms-2">
            <i class="bi fs-3" :class="[dayIsFree
              ? ['bi-check-circle-fill', 'text-success']
              : ['bi-x-circle-fill', 'text-danger']
            ]"/>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
