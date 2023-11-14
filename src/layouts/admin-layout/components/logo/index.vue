<script setup lang="ts">
import ILogo from "@/assets/img/logo.webp";

withDefaults(
	defineProps<{
		/** 显示名字 */
		showTitle?: boolean;
		showIcon?: boolean;

		iconWidth?: number;
		titleWidth?: string;
	}>(),
	{
		iconWidth: 64,
		// titleWidth: "0px",
		showIcon: true,
	}
);

const title = import.meta.env.VITE_DOCUMENT_TITLE;
</script>

<template>
	<div class="flex items-center justify-start nowrap-hidden text-[var(--primary-color)]">
		<!-- <i class="i-ph:reddit-logo-bold text-32px text-primary" /> -->
		<div
			v-if="showIcon"
			class="flex-center transition-all transition-duration-300"
			:style="{ width: `${iconWidth}px` }"
		>
			<n-avatar :src="ILogo" :style="{ backgroundColor: 'transparent' }" />
		</div>
		<transition name="fade">
			<h2 v-if="showTitle" class="text-primary" :style="{ width: titleWidth }">
				<slot>{{ title }}</slot>
			</h2>
		</transition>

		<slot name="suffix" />
	</div>
</template>
