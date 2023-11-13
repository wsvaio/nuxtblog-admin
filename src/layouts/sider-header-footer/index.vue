<script setup lang="ts">
defineProps<{
	siderWidth?: number | string;
}>();
const setting = useSettingStore();
</script>

<template>
	<article class="sider-header-footer" :class="setting.type">
		<aside
			v-if="$slots.sider"
			:style="{
				width: typeof siderWidth === 'number' ? `${siderWidth}px` : siderWidth,
			}"
		>
			<slot name="sider" />
		</aside>
		<article>
			<header v-if="$slots.header">
				<slot name="header" />
			</header>
			<section>
				<slot />
			</section>
			<footer v-if="$slots.footer">
				<slot name="footer" />
			</footer>
		</article>
	</article>
</template>

<style lang="less" scoped>
.sider-header-footer {
	display: grid;
	grid-template-columns: max-content 1fr;

	& > aside {
		border-right: 1px solid var(--border-color);
	}

	& > article {
		display: flex;
		flex-direction: column;

		& > header {
			flex: none;
			border-bottom: 1px solid var(--border-color);
		}

		& > section {
			flex: 1 1 0;
		}

		& > footer {
			flex: none;
			border-top: 1px solid var(--border-color);
		}
	}

	&.mini {
		grid-template-columns: 1fr;
		grid-template-rows: max-content max-content;

		&>aside {
			width: 100% !important;
			border-right: none;
		}
	}
}
</style>
