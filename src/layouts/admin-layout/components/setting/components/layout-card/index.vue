<script setup lang="ts">
defineProps<{
	/** 布局模式 */
	mode: string;
	/** 布局模式文本 */
	label: string;
	/** 选中状态 */
	checked?: boolean;
}>();
</script>

<template>
	<div
		class="border-2px border-solid rounded-6px cursor-pointer hover:border-primary transition-all"
		:class="[checked ? 'border-primary' : 'border-transparent']"
	>
		<n-tooltip trigger="hover">
			<template #trigger>
				<div
					class="layout-card__shadow gap-6px w-96px h-64px p-6px rd-4px"
					:class="['left', 'left-mix'].includes(mode) ? 'flex' : 'flex-col'"
				>
					<template v-if="mode === 'left'">
						<div class="w-18px h-full bg-primary:50 rd-4px" />
						<div class="flex-1 flex-col gap-6px">
							<div class="h-16px bg-primary rd-4px" />
							<div class="flex-1 bg-primary rd-4px opacity-25" />
						</div>
					</template>
					<template v-if="mode === 'left-mix'">
						<div class="w-8px h-full bg-primary opacity-50 rd-4px" />
						<div class="w-16px h-full bg-primary opacity-50 rd-4px" />
						<div class="flex-1 flex-col gap-6px">
							<div class="h-16px bg-primary rd-4px" />
							<div class="flex-1 bg-primary opacity-25 rd-4px" />
						</div>
					</template>
					<template v-if="mode === 'top'">
						<div class="h-16px bg-primary rd-4px" />
						<div class="flex-1 flex gap-6px">
							<div class="flex-1 bg-primary opacity-25 rd-4px" />
						</div>
					</template>
					<template v-if="mode === 'top-mix'">
						<div class="h-16px bg-primary rd-4px" />
						<div class="flex-1 flex gap-6px">
							<div class="w-18px bg-primary opacity-50 rd-4px" />
							<div class="flex-1 bg-primary opacity-25 rd-4px" />
						</div>
					</template>
				</div>
			</template>
			<span>{{ label }}</span>
		</n-tooltip>
	</div>
</template>

<style lang="less" scoped>
.layout-card__shadow {
	box-shadow: 0 1px 2.5px rgb(0 0 0 / 18%);
}
</style>
