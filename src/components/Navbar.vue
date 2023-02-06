<script setup lang="ts">
import { ref } from 'vue';
import { getIsoDateStringWithoutTime } from '@/common/helpers';

const emit = defineEmits<{(e: 'update:modelValue', date: Date): void}>()

const { startDate, endDate, modelValue } = defineProps<{
	startDate: Date,
	endDate: Date
	modelValue: Date,
}>()

const isoDateString = ref(getIsoDateStringWithoutTime(modelValue))

function goToDate(dateString: string) {
	const candidate_date = new Date(dateString);
	if (isNaN(candidate_date.getTime())) // invalid date
		return;
	candidate_date.setUTCHours(0, 0, 0, 0);

	isoDateString.value = getIsoDateStringWithoutTime(candidate_date);
	emit('update:modelValue', candidate_date);
}

function goToToday() {
	goToDate(getIsoDateStringWithoutTime(new Date()))
}

</script>

<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
		<div class="container-fluid">
			<div>
				<span class="navbar-brand h1">Service Calendar 9000</span>
				<span class="navbar-text">
					{{ startDate.toDateString() }} to {{ endDate.toDateString() }}
				</span>
			</div>

			<div class="d-flex">
				<input class="form-control me-2" type="search" placeholder="Search" v-model="isoDateString">
				<button class="btn btn-outline-primary me-2" @click="goToDate(isoDateString)">Go</button>
				<button class="btn btn-outline-success" @click="goToToday">Today</button>
			</div>
		</div>
	</nav>
</template>

<style scoped>
</style>
