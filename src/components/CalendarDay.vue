<script setup lang="ts">
import { Day } from "@/common";

const { day, marked } = defineProps<{
  day: Day;
  marked?: boolean;
}>();

function getDayClass() {
  const today = Day.today();
  const result = day.compareMS(today);
  return {
    "text-decoration-line-through": result < 0,
    past: result < 0,
    today: today.getFullYear() == day.getFullYear() && today.getMonth() == day.getMonth() && today.getDate() == day.getDate(),
    marked,
  };
}
</script>

<template>
  <div :id="day.toString()" class="day-container py-2" :class="getDayClass()">
    <div class="day-circle">
      {{ day.getDate() }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.day-container {
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.day-container.marked {
  background: var(--bs-primary);
  color: var(--bs-light);
}
.day-container.marked.past {
  background: var(--bs-gray-700);
  color: var(--bs-light);
}

.day-circle {
  height: 2.4em;
  width: 2.4em;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.today > .day-circle {
  background-color: rgba($color: rgb(124, 0, 0), $alpha: 1);
  color: var(--bs-light);
}

.day-circle:hover {
  background-color: rgba($color: #000, $alpha: 0.2);
}
</style>
