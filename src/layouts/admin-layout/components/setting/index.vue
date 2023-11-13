<script setup lang="ts">
import LayoutMode from "./views/layout-mode/index.vue";
import ThemeMode from "./views/theme-mode/index.vue";
import SystemTheme from "./views/system-theme/index.vue";
import PageFunc from "./views/page-func/index.vue";
import PageView from "./views/page-view/index.vue";
</script>

<template>
	<n-drawer-content title="系统设置" :native-scrollbar="false">
		<theme-mode />
		<layout-mode />
		<system-theme />
		<page-func />
		<page-view />

		<n-divider />

		<n-button block type="warning" @click="useSettingStore().$reset()">重置</n-button>
	</n-drawer-content>
</template>

<style lang="less" scoped></style>
