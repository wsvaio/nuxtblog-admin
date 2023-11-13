<script setup lang="ts">
withDefaults(
	defineProps<{
		siderWidth?: string;
	}>(),
	{
		siderWidth: "max(256px, 16vw)",
	}
);
let collapse = $ref(false);
const setting = useSettingStore();
</script>

<template>
	<article class="sider-header" :class="[$slots.header && 'headerable', $slots.sider && 'siderable', setting.type]">
		<template v-if="$slots.sider">
			<aside :class="[collapse && 'collapse']" :style="{ '--sider-width': siderWidth }">
				<div>
					<n-scrollbar>
						<slot name="sider" />
					</n-scrollbar>
				</div>
			</aside>

			<n-button
				v-if="!setting.typeHas('mini')"
				class="collapse-btn"
				:class="[collapse && 'collapse']"
				:color="setting.themeVars.primaryColor4"
				@click="collapse = !collapse"
			>
				<div class="icon i-ep:arrow-down" />
			</n-button>
		</template>

		<header v-if="$slots.header">
			<slot name="header" />
		</header>
		<section>
			<n-scrollbar>
				<slot />
			</n-scrollbar>
		</section>
	</article>
</template>

<style lang="less" scoped>
.sider-header {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr;
	gap: var(--spacing) 0;
	// flex: 1 1 0;

	& > aside,
	& > section,
	& > header {
		overflow: auto;
		border-radius: 8px;
		background-color: var(--bg-color);
		// box-shadow: 4px 4px 21px 0 rgb(197 200 209 / 20%);
		// // box-shadow: var(--box-shadow3);
		box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
	}

	& > aside,
	& > .collapse-btn {
		grid-row: -1 / 1;
	}

	& > aside {
		display: flex;
		flex-direction: column;
		width: var(--sider-width);
		overflow: hidden;
		// width: 16vw;
		transition: all 0.3s;

		& > div {
			width: var(--sider-width);
			height: 100%;
		}

		&.collapse {
			width: 0;
			opacity: 0;
		}
	}

	.collapse-btn {
		z-index: 10;
		align-self: center;
		width: var(--spacing);
		height: 128px;
		padding: 24px 0;
		transition: all 0.3s;
		border: none;
		border-radius: 0 8px 8px 0;

		.icon {
			transform: rotate(90deg);
			transition: transform 0.3s;
		}

		&.collapse {
			margin-right: calc(var(--spacing) * -1);
			transform: translateX(calc(var(--spacing) * -1) ;);

			.icon {
				transform: rotate(90deg) rotateX(180deg);
			}
		}
	}

	&:not(.mini) {
		&.headerable {
			grid-template-rows: max-content 1fr;
		}

		&.siderable {
			grid-template-columns: max-content max-content 1fr;
		}
	}

	&.mini {
		// &.headerable {

		// }

		// &.siderable {
		// 	grid-template-columns: 1fr;
		// 	grid-template-rows: max-content 1fr;

		// 	&.headerable {
		// 		grid-template-rows: max-content max-content 1fr;
		// 	}

		// 	& > aside {
		// 		grid-row: span 1;
		// 		width: 100%;
		// 		height: 512px;
		// 	}
		// }
		display: flex;
		flex-direction: column;

		& > aside {
			width: 100%;

			& > div {
				width: 100%;
			}
		}
	}
}
</style>
