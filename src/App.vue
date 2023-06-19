<script setup lang="ts">
import Calendar from "@/components/Calendar.vue";
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";

const useCarousel = ref(false);
</script>

<template>
  <Suspense>
    <Navbar v-model:useCarousel="useCarousel" />
  </Suspense>
  <Suspense>
    <Calendar :useCarousel="useCarousel"/>
  </Suspense>
</template>

<style scoped></style>
