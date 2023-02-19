<script setup lang="ts">
import Calendar from "@/components/Calendar.vue";
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";

const useCarousel = ref(false);
</script>

<template>
  <Navbar v-model:useCarousel="useCarousel" />
  <Calendar />
</template>

<style scoped></style>
