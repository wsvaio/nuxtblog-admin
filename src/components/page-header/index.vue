<script setup lang="ts">
defineProps<{
	icon?: string;
	title?: string;
}>();

defineEmits<{
	iconClick: [];
}>();
</script>

<template>
	<header class="page-header">
		<n-button text justify-start @click="$emit('iconClick')">
			<div :class="icon" text="20px" class="icon" />
		</n-button>
		<n-ellipsis text="16px center" lh="[1]">
			{{ title }}
		</n-ellipsis>
	</header>
</template>

<style lang="less" scoped>
.page-header {
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	align-items: center;
	padding: var(--spacing);
	background-color: var(--th-color);
	gap: var(--spacing-xs);
}
</style>
