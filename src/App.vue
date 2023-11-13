<script setup lang="ts">
import { darkTheme, dateZhCN, lightTheme, zhCN } from "naive-ui";

const setting = useSettingStore();

const icons = [
	"i-carbon-ibm-cloud-projects",
	"i-carbon-in-progress",
	"i-fa6-solid-helmet-safety",
	"i-material-symbols-supervised-user-circle-outline",
	"i-material-symbols-smart-toy-outline",
	"i-material-symbols-devices-other",
	"i-carbon-cloud-satellite-config",
	"i-uil-sitemap",

];
</script>

<template>
	<n-config-provider
		:theme="setting.isDark ? darkTheme : lightTheme"
		:theme-overrides="{
			common: {
				...setting.themeVars,
			},
		}"
		:locale="zhCN"
		:date-locale="dateZhCN"
		abstract
	>
		<n-message-provider>
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</n-message-provider>
	</n-config-provider>

	<transition name="fade">
		<global-loading v-if="setting.globalLoading" />
	</transition>

	<div :class="icons" :style="{ display: 'none' }" />
</template>

<style lang="less" scoped></style>
