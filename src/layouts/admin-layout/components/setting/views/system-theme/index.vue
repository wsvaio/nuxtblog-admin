<script setup lang="ts">
import ColorCheckbox from "../../components/color-checkbox/index.vue";

defineOptions({ name: "ThemeColorSelect" });

const themeColorList = [
	"#1890ff",
	"#409EFF",
	"#007AFF",
	"#5ac8fa",
	"#5856D6",
	"#536dfe",
	"#646cff",
	"#9c27b0",
	"#AF52DE",
	"#0096c7",
	"#00C1D4",
	"#34C759",
	"#43a047",
	"#7cb342",
	"#c0ca33",
	"#78DEC7",
	"#e53935",
	"#d81b60",
	"#f4511e",
	"#fb8c00",
	"#ffb300",
	"#fdd835",
	"#6d4c41",
	"#546e7a",
];

const setting = useSettingStore();
</script>

<template>
	<n-divider title-placement="center">系统主题</n-divider>
	<n-grid :cols="8" :x-gap="8" :y-gap="12">
		<n-grid-item v-for="color in themeColorList" :key="color" class="flex-x-center">
			<color-checkbox
				:color="color"
				:checked="color == setting.primaryColor"
				@click="setting.primaryColor = color"
			/>
		</n-grid-item>
	</n-grid>
	<n-space :vertical="true" class="pt-12px">
		<n-color-picker :value="setting.primaryColor" :show-alpha="false" @update-value="ev => setting.primaryColor = ev" />
	</n-space>
</template>

<style scoped></style>
