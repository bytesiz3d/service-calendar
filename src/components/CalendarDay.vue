<script setup lang="ts">
const { day, marked } = defineProps<{
  day: Date;
  marked?: boolean;
}>();

function getDayClass() {
  const result = day.compareDays(Date.today());
  return {
    "text-decoration-line-through": result < 0,
    past: result < 0,
    today: result == 0,
    marked,
  };
}
</script>

<template>
  <div :id="day.toDateString()" class="day-container py-2" :class="getDayClass()">
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
