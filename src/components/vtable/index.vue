<script setup lang="ts">
import type { DataTableProps } from "naive-ui";

defineProps<{
	columns?: DataTableProps["columns"];
	data?: DataTableProps["data"];
	flexHeight?: DataTableProps["flexHeight"];
	loading?: DataTableProps["loading"];
	theadTop?: string;
	checkedRrowKeys?: DataTableProps["checkedRowKeys"];
	rowKey?: DataTableProps["rowKey"];
}>();

defineEmits(["update:checked-row-keys"]);
</script>

<template>
	<n-data-table
		:checked-row-keys="checkedRrowKeys"
		:row-key="rowKey"
		class="vtable"
		:columns="columns"
		:data="data"
		:bordered="false"
		:bottom-bordered="false"
		single-column
		single-line
		:flex-height="flexHeight"
		:loading="loading"
		:style="{
			'--thead-top': typeof theadTop == 'string' ? theadTop : undefined,
		}"
		table-layout="fixed"
		@update:checked-row-keys="$emit('update:checked-row-keys', $event)"
	/>
</template>

<style lang="less" scoped>
.vtable {
	--n-merged-th-color: var(--th-color);
	--n-merged-border-color: var(--th-color);
	--n-pagination-margin: var(--spacing-sm) var(--spacing) !important;

	:deep(.n-data-table-thead) {
		position: sticky;
		z-index: 10;
		top: var(--thead-top);
	}
}
</style>
