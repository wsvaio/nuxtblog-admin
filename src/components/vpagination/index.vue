<script setup lang="ts">
import type { PaginationProps } from "naive-ui";

defineProps<{
	itemCount?: PaginationProps["itemCount"];
}>();

const page = defineModel<PaginationProps["page"]>("page");
const pageSize = defineModel<PaginationProps["pageSize"]>("pageSize");
</script>

<template>
	<n-pagination
		v-model:page="page"
		v-model:page-size="pageSize"
		class="p-[var(--spacing)] justify-end"
		:item-count="itemCount"
		show-quick-jumper
		show-size-picker
		:page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
	/>
</template>

<style lang="less" scoped></style>
