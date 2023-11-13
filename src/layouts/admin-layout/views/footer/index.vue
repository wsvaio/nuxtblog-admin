<script setup lang="ts">
const setting = useSettingStore();
</script>

<template>
	<n-layout-footer
		v-if="setting.footer.visible"
		class="footer"
		:class="[setting.type, setting.footer.fixed && 'fixed']"
		:style="{
			height: `${setting.footer.height}px`,
			background: setting.footer.inverted ? undefined : 'var(--footer-bg-color)',
		}"
		:inverted="setting.footer.inverted"
	>
		Copyright © 2023 绍兴智充客软件开发有限公司. All rights reserved.
	</n-layout-footer>
</template>

<style lang="less" scoped>
.footer {
	display: flex;
	z-index: 1000;
	flex: none;
	align-items: center;
	justify-content: center;
	transition: all 0.3s var(--cubic-bezier-ease-in-out);
	// box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
	color: var(--text-color3);
	font-size: 12px;

	&.fixed {
		position: sticky;
		bottom: 0;
	}

	&.left, &.top-mix, &.top-mix-split, &.left-mix {
		padding-left: var(--sider-real-width);
	}
}
</style>
