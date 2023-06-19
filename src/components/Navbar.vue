<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSearchDateStore } from "@/store";
import { DATES } from "@/common";
import { computed } from "vue";

const { useCarousel } = defineProps<{ useCarousel: boolean }>();
const emit = defineEmits<{ (e: "update:useCarousel", value: boolean): void }>();

const searchStore = useSearchDateStore();
const { searchDate: searchRef } = storeToRefs(searchStore);

function toggleCarousel(e: Event) {
  const check = e as unknown as { target: { checked: boolean } };
  emit("update:useCarousel", check.target.checked);
}

const startDate = await DATES.start;

const dayIsFree = computed(
  () => !new Date(searchRef.value).matchesAlternatingWeeks(startDate)
);

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top border-bottom">
    <div class="container-fluid">
      <div class="navbar-brand">
        <span class="fs-3 g-col-12 g-col-md-6"> Service Calendar 9000 </span>

        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" :checked="useCarousel" @change="toggleCarousel" />
          <label class="form-check-label fs-6">Compact</label>
        </div>
      </div>

      <div class="d-flex w-25 align-items-center">
        <div class="input-group">
          <i class="input-group-text bi bi-search"></i>
          <input id="searchDate" type="date" class="form-control" v-model="searchRef" />
        </div>
        <div class="ms-2">
          <i class="bi fs-3" :class="[dayIsFree
            ? ['bi-check-circle-fill', 'text-success']
            : ['bi-x-circle-fill', 'text-danger']
          ]"/>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
