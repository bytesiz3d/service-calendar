<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDateRangeStore } from "@/store";
import Calendar from "@/components/Calendar.vue";
import Navbar from "@/components/Navbar.vue";
import { ref, onBeforeMount } from "vue";

const dateRangeStore = useDateRangeStore();
const { weeksLeft, weeksTotal } = storeToRefs(dateRangeStore);

onBeforeMount(() => {
  const metas = Array.from(document.getElementsByTagName("meta"))
  const metaDescription = metas.find(m => m.attributes[0].nodeValue === "og:description")
  if (metaDescription)
    metaDescription.attributes[1].nodeValue = `${weeksTotal.value - weeksLeft.value}/${weeksTotal.value}`
})

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
