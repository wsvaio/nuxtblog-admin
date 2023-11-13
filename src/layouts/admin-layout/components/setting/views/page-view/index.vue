<script setup lang="ts">
const setting = useSettingStore();
</script>

<template>
	<n-divider>界面显示</n-divider>
	<div class="flex flex-col gap-[var(--spacing-sm)]">
		<label-value label="面包屑" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.header.crumbVisible" />
		</label-value>

		<label-value label="面包屑图标" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.header.crumbShowIcon" />
		</label-value>

		<label-value label="多签页" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.tab.visible" />
		</label-value>

		<label-value label="底部" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.footer.visible" />
		</label-value>

		<label-value label="切换动画" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.page.animate" />
		</label-value>

		<label-value label="动画类型" :value-style="{ overflow: 'visible' }" items="center">
			<n-select
				v-model:value="setting.page.animateMode"
				class="w-120px"
				size="small"
				:options="[
					{ label: '渐变', value: 'fade' },
					{ label: '放大', value: 'grow' },
					{ label: '缩小', value: 'shrink' },
					{ label: '上滑', value: 'up' },
					{ label: '右滑', value: 'right' },
					{ label: '下滑', value: 'down' },
					{ label: '左滑', value: 'left' },
				]"
			/>
		</label-value>

		<label-value label="动画速度" :value-style="{ overflow: 'visible' }" items="center">
			<n-input-number v-model:value="setting.page.animationDuration" class="w-120px" size="small" :step="1" />
		</label-value>

		<label-value label="动画力度" items="center" :value-style="{ overflow: 'visible' }">
			<n-slider v-model:value="setting.page.animationIntensity" w="120px" />
		</label-value>
	</div>
</template>

<style lang="less" scoped></style>
