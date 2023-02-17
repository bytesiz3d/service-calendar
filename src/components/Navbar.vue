<script setup lang="ts">
import { DATES } from '@/common';
import DatePicker from '@/components/DatePicker.vue';

const emit = defineEmits<{(e: 'update:searchDate', date: Date): void}>()
const { searchDate } = defineProps<{
	searchDate: Date,
}>()

function update(date: Date) {
	emit('update:searchDate', date);
}
</script>

<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
		<div class="container-fluid">
			<div>
				<span class="navbar-brand h1">Service Calendar 9000</span>
				<span class="navbar-text">
					{{ DATES.start.toDateString() }} to {{ DATES.end.toDateString() }}
				</span>
			</div>

			<DatePicker :date="searchDate" @update:date="update"/>
		</div>
	</nav>
</template>

<style scoped>
</style>
