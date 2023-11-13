<script setup lang="ts">
withDefaults(
	defineProps<{
		type?: "type1";
	}>(),
	{
		type: "type1",
	}
);
</script>

<template>
	<div class="prefix-title" :class="type">
		<div class="prefix" />
		<div class="content"><slot /></div>
	</div>
</template>

<style lang="less" scoped>
.prefix-title {
	&.type1 {
		display: flex;
		// align-items: center;
		justify-content: flex-start;
		background-color: var(--primary-color1);
		line-height: 2;

		& > .prefix {
			width: 0.25em;
			height: 2em;
			background-color: var(--primary-color);
		}

		& > .content {
			margin-right: 0.75em;
			margin-left: 0.75em;
		}
	}
}
</style>
