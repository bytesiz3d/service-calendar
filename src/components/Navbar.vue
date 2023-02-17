<script setup lang="ts">
import { DATES } from '@/common';
import DatePicker from '@/components/DatePicker.vue';

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

			<DatePicker />
		</div>
	</nav>
</template>

<style scoped>
</style>
