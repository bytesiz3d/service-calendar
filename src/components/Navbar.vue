<script setup lang="ts">
import DatePicker from "@/components/DatePicker.vue";

const { useCarousel } = defineProps<{ useCarousel: boolean }>();
const emit = defineEmits<{ (e: "update:useCarousel", value: boolean): void }>();

function toggleCarousel(e: Event) {
  emit("update:useCarousel", e.target.checked);
}
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light sticky-top border-bottom"
  >
    <div class="container-fluid">
      <div class="navbar-brand">
        <span class="fs-3 g-col-12 g-col-md-6"> Service Calendar 9000 </span>

        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            :checked="useCarousel"
            @change="toggleCarousel"
          />
          <label class="form-check-label fs-6">Compact</label>
        </div>
      </div>

      <DatePicker />
    </div>
  </nav>
</template>

<style scoped></style>
