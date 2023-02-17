<script setup lang="ts">
import CalendarMonth from '@/components/CalendarMonth.vue';
import { FirstDayOfEachMonthGenerator, getIsoDateStringWithoutTime, DATES } from '@/common/helpers';
import { watch, toRef, onMounted } from 'vue';

const props = defineProps<{
	searchDate: Date
}>()

function scrollToDate(date: Date) {
	const day_id = getIsoDateStringWithoutTime(date);
	const day_element = document.getElementById(day_id);
	day_element?.scrollIntoView({block: 'center', inline: 'nearest'});
}

onMounted(() => scrollToDate(props.searchDate))
watch(toRef(props, 'searchDate'), (date: Date, _: Date) => scrollToDate(date))

const firstDayOfEachMonth = new FirstDayOfEachMonthGenerator(DATES.start, DATES.end);

</script>

<template>
	<div class="container">
		<CalendarMonth v-for="day in firstDayOfEachMonth.gen()"
			class="my-5" :first-day-of-month="day" />
	</div>
</template>