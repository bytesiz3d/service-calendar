<script setup lang="ts">
import { ref } from 'vue';

import Calendar from '@/components/Calendar.vue';
import Navbar from '@/components/Navbar.vue';

const startDate = new Date('2022-11-17');
const endDate = new Date('2023-11-25');
const searchDate = ref(new Date());

</script>

<template>
  <Navbar :startDate="startDate" :endDate="endDate" v-model="searchDate"/>
  <Calendar :startDate="startDate" :endDate="endDate" :searchDate="searchDate"/>
</template>

<style scoped>

</style>
