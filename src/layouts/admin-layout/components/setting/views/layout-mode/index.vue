<script setup lang="ts">
import LayoutCard from "../../components/layout-card/index.vue";

const setting = useSettingStore();
</script>

<template>
	<n-divider>布局模式</n-divider>
	<div
		grid="~ cols-[max-content_max-content] rows-2"
		class="place-items-center place-content-center gap-[var(--spacing-lg)]"
	>
		<layout-card mode="left" label="左侧菜单模式" :checked="setting.type == 'left'" @click="setting.type = 'left'" />
		<layout-card
			mode="left-mix"
			label="左侧菜单混合模式"
			:checked="setting.type == 'left-mix'"
			@click="setting.type = 'left-mix'"
		/>
		<layout-card mode="top" label="顶部菜单模式" :checked="setting.type == 'top'" @click="setting.type = 'top'" />
		<layout-card
			mode="top-mix"
			label="顶部菜单混合模式"
			:checked="setting.type == 'top-mix-split' || setting.type == 'top-mix'"
			@click="['top-mix-split', 'top-mix'].includes(setting.type) || (setting.type = 'top-mix-split')"
		/>
	</div>
</template>

<style lang="less" scoped></style>
