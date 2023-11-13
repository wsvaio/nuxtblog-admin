<script setup lang="ts">
const rectRef = $ref<HTMLDivElement>();
let width = $ref(0);
let height = $ref(0);
useResizeObserver(
	() => rectRef,
	() => {
		console.log("啊？");
		if (!rectRef) return;
		width = rectRef?.clientWidth;
		height = rectRef?.clientHeight;
	}
);

defineExpose({ width: $$(width), height: $$(height) });
</script>

<template>
	<div
		ref="rectRef"
		class="rect"
		:style="{
			'--width': `${width}px`,
			'--height': `${height}px`,
		}"
	>
		<slot :width="width" :height="height" />
	</div>
</template>

<style lang="less" scoped></style>
