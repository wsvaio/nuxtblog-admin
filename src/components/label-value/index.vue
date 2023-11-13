<script setup lang="ts">
import type { CSSProperties } from "vue";

withDefaults(
	defineProps<{
		label?: string | number;
		value?: string | number;
		type?: "normal";
		gap?: string;

		labelClass?: string | string[];
		labelStyle?: CSSProperties;
		valueClass?: string | string[];
		valueStyle?: CSSProperties;
	}>(),
	{
		type: "normal",
		gap: "var(--spacing-xs) var(--spacing)",
		colon: false,
	}
);

defineEmits(["click"]);
</script>

<template>
	<div
		class="label-value"
		:class="[type]"
		:style="{
			gap,
		}"
	>
		<div class="label" :style="labelStyle" :class="labelClass">
			<slot name="label">{{ label }}</slot>
		</div>
		<div class="value" :style="valueStyle" :class="valueClass">
			<slot>{{ value }}</slot>
		</div>
	</div>
</template>

<style lang="less" scoped>
.label-value {
	&.normal {
		display: flex;
		justify-content: space-between;
		line-height: 1;

		& > .label {
			flex: none;
			color: var(--text-color3);
		}

		& > .value {
			overflow: hidden;
			color: var(--text-color2);
		}
	}
}
</style>
