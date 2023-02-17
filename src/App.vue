<script setup lang="ts">
import { ref } from 'vue';

import Calendar from '@/components/Calendar.vue';
import Navbar from '@/components/Navbar.vue';

const searchDate = ref(Date.today());

</script>

<template>
  <Navbar v-model:searchDate="searchDate"/>
  <Calendar :searchDate="searchDate"/>
</template>

<style scoped>

</style>
