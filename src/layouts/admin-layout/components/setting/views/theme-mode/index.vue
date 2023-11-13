<script setup lang="ts">
const setting = useSettingStore();
</script>

<template>
	<n-divider>主题模式</n-divider>
	<div class="flex flex-col gap-[var(--spacing-sm)]">
		<label-value label="深色主题" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.isDark">
				<template #checked>
					<div class="text-14px text-white i-mdi-white-balance-sunny" />
				</template>
				<template #unchecked>
					<div class="text-14px text-white i-mdi-moon-waning-crescent" />
				</template>
			</n-switch>
		</label-value>

		<label-value label="跟随系统" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.followSystemTheme">
				<template #checked>
					<div class="text-14px text-white i-ic-baseline-do-not-disturb" />
				</template>
				<template #unchecked>
					<div class="text-14px text-white i-ic-round-hdr-auto" />
				</template>
			</n-switch>
		</label-value>

		<label-value label="自定义暗黑主题动画过渡" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.customizeDarkModeTransition">
				<template #checked>
					<div class="text-14px text-white i-ic-baseline-do-not-disturb" />
				</template>
				<template #unchecked>
					<div class="text-14px text-white i-ic-round-hdr-auto" />
				</template>
			</n-switch>
		</label-value>

		<label-value label="侧边栏深色" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.sider.inverted" />
		</label-value>

		<label-value label="头部深色" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.header.inverted" />
		</label-value>

		<label-value label="底部深色" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.footer.inverted" />
		</label-value>
	</div>
</template>

<style lang="less" scoped></style>
