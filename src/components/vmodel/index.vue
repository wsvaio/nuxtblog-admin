<script setup lang="ts">
import type { CSSProperties } from "vue";

withDefaults(
	defineProps<{
		aspectRatio?: string;
		contentStyle?: CSSProperties;
		loading?: boolean;
		width?: number | string;
		height?: number | string;
	}>(),
	{
		width: "var(--md)",
		// aspectRatio: "0.618 / 0.382",
	}
);

const emit = defineEmits<{
	beforeEnter: [];
	afterEnter: [];
	beforeLeave: [];
	afterLeave: [];
}>();
const show = defineModel<boolean>("show");

watch(
	() => show.value,
	() => {
		if (show.value) emit("beforeEnter");
	}
);

const setting = useSettingStore();
</script>

<template>
	<n-modal
		v-model:show="show"
		preset="card"
		class="vmodal"
		:class="setting.type"
		:content-style="{
			padding: 'var(--spacing-lg)',
			overflow: 'auto',
			...contentStyle,
		}"
		:header-style="{
			backgroundColor: 'var(--th-color)',
		}"
		:footer-style="{
			padding: 'var(--spacing-lg)',
			borderTop: '1px solid var(--border-color)',
		}"
		:style="{
			width: typeof width === 'number' ? `${width}px` : width,
			height: typeof height === 'number' ? `${height}px` : height,
		}"
		:mask-closable="false"
		@after-enter="$emit('afterEnter')"
		@after-leave="$emit('afterLeave')"
		@before-leave="$emit('beforeLeave')"
    :close-on-esc="false"
	>
		<template #header>
			<slot name="header" />
		</template>

		<vrect
			#="{ height }"
			:style="{
				height: $props.height ? `100%` : undefined,
			}"
		>
			<n-spin :show="loading">
				<n-scrollbar :style="{ height: $props.height ? `${height}px` : undefined }">
					<slot :height="height" />
				</n-scrollbar>
			</n-spin>
		</vrect>

		<template #footer>
			<slot name="footer" />
		</template>
	</n-modal>
</template>

<style lang="less">
.n-modal.vmodal {
	overflow: hidden;

	& > .n-card__content {
		& > .rect {
			& > .n-spin-container {
				& > .n-spin-content {
					& > .n-scrollbar {
						& > .n-scrollbar-container {
							& > .n-scrollbar-content {
								min-height: var(--height);
							}
						}
					}
				}
			}
		}
	}

	&.mini {
		width: 100% !important;
		height: 100dvh !important;
		// aspect-ratio: unset !important;
		overflow: auto;
	}
}
</style>
