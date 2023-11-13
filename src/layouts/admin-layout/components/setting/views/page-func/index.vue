<script setup lang="ts">
const setting = useSettingStore();
</script>

<template>
	<n-divider>界面功能</n-divider>

	<div class="flex flex-col gap-[var(--spacing-sm)]">
		<label-value label="分割菜单（顶部混合模式）" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch
				:value="setting.type == 'top-mix-split'"
				:disabled="!setting.typeHas('top-mix', 'top-mix-split')"
				@update:value="val => (setting.type = val ? 'top-mix-split' : 'top-mix')"
			/>
		</label-value>

		<label-value label="滚动模式" :value-style="{ overflow: 'visible' }" items="center">
			<n-select
				v-model:value="setting.page.scrollMode"
				class="w-120px"
				size="small"
				:options="[
					{ label: '外层滚动', value: 'wrapper' },
					{ label: '主体滚动', value: 'content' },
				]"
			/>
		</label-value>

		<label-value label="固定头部（外层滚动）" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.header.fixed" :disabled="setting.page.scrollMode != 'wrapper'" />
		</label-value>

		<label-value label="固定多签页（外层滚动）" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.tab.fixed" :disabled="setting.page.scrollMode != 'wrapper'" />
		</label-value>

		<label-value label="固定底部（外层滚动）" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.footer.fixed" :disabled="setting.page.scrollMode != 'wrapper'" />
		</label-value>

		<label-value label="顶部菜单位置" :value-style="{ overflow: 'visible' }" items="center">
			<n-select
				v-model:value="setting.header.menuPosition"
				class="w-120px"
				size="small"
				:options="[
					{ label: '居左', value: 'left' },
					{ label: '居中', value: 'center' },
					{ label: '居右', value: 'right' },
				]"
			/>
		</label-value>

		<label-value label="多签页缓存" :value-style="{ overflow: 'visible' }" items="center">
			<n-switch v-model:value="setting.tab.isCache" />
		</label-value>

		<label-value label="头部高度" :value-style="{ overflow: 'visible' }" items="center">
			<n-input-number v-model:value="setting.header.height" class="w-120px" size="small" :step="1" />
		</label-value>

		<label-value label="多签页高度" :value-style="{ overflow: 'visible' }" items="center">
			<n-input-number v-model:value="setting.tab.height" class="w-120px" size="small" :step="1" />
		</label-value>

		<label-value label="侧边栏展开宽度" :value-style="{ overflow: 'visible' }" items="center">
			<n-input-number v-model:value="setting.sider.width" class="w-120px" size="small" :step="1" />
		</label-value>

		<label-value label="混合侧边栏展开宽度" :value-style="{ overflow: 'visible' }" items="center">
			<n-input-number v-model:value="setting.sider.leftMixWidth" class="w-120px" size="small" :step="1" />
		</label-value>
	</div>
</template>

<style lang="less" scoped></style>
