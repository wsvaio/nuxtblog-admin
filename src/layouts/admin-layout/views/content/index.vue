<script setup lang="ts">
const tab = useTabStore();
const setting = useSettingStore();

const name = computed(() => {
	if (!setting.page.animate) return undefined;
	else return setting.page.animateMode;
});
</script>

<template>
	<n-layout-content
		class="content"
		:class="setting.type"
		:native-scrollbar="false"
		:style="{
			'height':
				setting.page.scrollMode == 'content' && !setting.typeHas('mini') ? setting.themeVars.contentHeight : undefined,
			'--animation-duration': `${setting.page.animationDuration}ms`,
			'--animation-intensity': setting.page.animationIntensity / 100,
		}"
	>
		<router-view #="{ Component }">
			<transition mode="out-in" :name="`content-${name || 'none'}`">
				<keep-alive :include="setting.tab.isCache && setting.tab.visible ? tab.include : []" :exclude="tab.exclude">
					<component :is="Component" v-if="tab.isRouteView" :key="$route.fullPath" />
				</keep-alive>
			</transition>
		</router-view>
	</n-layout-content>
</template>

<style lang="less" scoped>
.n-layout-content.content {
	flex: none;
	min-height: var(--content-height);
	transition: all 0.3s var(--cubic-bezier-ease-in-out);
	background-color: var(--content-bg-color);

	& > :deep(.n-scrollbar > .n-scrollbar-container > .n-scrollbar-content) {
		padding: var(--spacing);
	}

	&.left,
	&.top-mix,
	&.top-mix-split,
	&.left-mix {
		padding-left: var(--sider-real-width);
	}

	&.mini {
		& > :deep(.n-scrollbar > .n-scrollbar-container > .n-scrollbar-content) {
			height: 100%;
		}
	}

	.content-fade-enter-active,
	.content-fade-leave-active {
		transition: all var(--animation-duration) var(--cubic-bezier-ease-in-out);
	}

	.content-fade-enter-from,
	.content-fade-leave-to {
		opacity: 0;
	}

	// content-shrink
	.content-shrink-leave-active,
	.content-shrink-enter-active {
		transition: all var(--animation-duration) var(--cubic-bezier-ease-in-out);
	}

	.content-shrink-enter-from {
		transform: scale(calc(1 + var(--animation-intensity)));
		opacity: 0;
	}

	.content-shrink-leave-to {
		transform: scale(calc(1 - var(--animation-intensity)));
		opacity: 0;
	}

	// content-grow
	.content-grow-leave-active,
	.content-grow-enter-active {
		transition: all var(--animation-duration) var(--cubic-bezier-ease-in-out);
	}

	.content-grow-enter-from {
		transform: scale(calc(1 - var(--animation-intensity)));
		opacity: 0;
	}

	.content-grow-leave-to {
		transform: scale(calc(1 + var(--animation-intensity)));
		opacity: 0;
	}

	// content-down
	.content-down-enter-active,
	.content-down-leave-active {
		transition: all var(--animation-duration) var(--cubic-bezier-ease-in-out);
	}

	.content-down-enter-from {
		transform: translateY(calc(-100% * var(--animation-intensity)));
		opacity: 0;
	}

	.content-down-leave-to {
		transform: translateY(calc(100% * var(--animation-intensity)));
		opacity: 0;
	}

	// content-up
	.content-up-enter-active,
	.content-up-leave-active {
		transition: all var(--animation-duration) var(--cubic-bezier-ease-in-out);
	}

	.content-up-enter-from {
		transform: translateY(calc(100% * var(--animation-intensity)));
		opacity: 0;
	}

	.content-up-leave-to {
		transform: translateY(calc(-100% * var(--animation-intensity)));
		opacity: 0;
	}

	// content-left
	.content-left-enter-active,
	.content-left-leave-active {
		transition: all var(--animation-duration) var(--cubic-bezier-ease-in-out);
	}

	.content-left-enter-from {
		transform: translateX(calc(100% * var(--animation-intensity)));
		opacity: 0;
	}

	.content-left-leave-to {
		transform: translateX(calc(-100% * var(--animation-intensity)));
		opacity: 0;
	}

	// content-right
	.content-right-enter-active,
	.content-right-leave-active {
		transition: all var(--animation-duration) var(--cubic-bezier-ease-in-out);
	}

	.content-right-enter-from {
		transform: translateX(calc(-100% * var(--animation-intensity)));
		opacity: 0;
	}

	.content-right-leave-to {
		transform: translateX(calc(100% * var(--animation-intensity)));
		opacity: 0;
	}

	// none
	.content-none-enter-active,
	.content-none-leave-active {
		transition: initial;
	}
}
</style>
