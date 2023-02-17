<script setup lang="ts">
import { ref } from 'vue';

import Calendar from '@/components/Calendar.vue';
import Navbar from '@/components/Navbar.vue';

const searchDate = ref(new Date());

</script>

<template>
  <Navbar v-model="searchDate"/>
  <Calendar :searchDate="searchDate"/>
</template>

<style scoped>

</style>
