<script setup lang="ts">
import { useElementEvent } from "@wsvaio/use";
import Logo from "../../components/logo/index.vue";

const setting = useSettingStore();
const { sider, header } = $(setting);
const menu = useMenuStore();

const show = computed(() => {
	// 当顶部菜单混合模式分割时，若子菜单为空，则不应该展示侧边栏
	if (setting.typeHas("top-mix-split")) if (!menu.subMenuOptions.length) return false;
	return setting.typeHas("left", "left-mix", "mini", "top-mix", "top-mix-split");
});

const showCommonLogoTitle = computed(() => {
	if (setting.typeHas("left-mix")) return false;
	return !sider.collapsed;
});

const commonLogoWidth = computed(() => {
	if (setting.typeHas("left-mix"))
		return setting.sider.collapsed ? setting.sider.leftMixCollapsedWidth : setting.sider.leftMixWidth;

	return setting.sider.collapsedWidth;
});

const commonMenuOptions = computed(() => {
	// 当顶部菜单混合模式分割时，从二级菜单开始展示
	if (setting.typeHas("top-mix-split")) return menu.subMenuOptions;
	if (setting.typeHas("left-mix")) return menu.currentActiveTopLevelLeftMixMenu?.children || menu.subMenuOptions;
	return menu.menuOptions;
});

const siderWidth = computed(() => {
	if (menu.currentActiveTopLevelLeftMixMenu?.children?.length)
		return (sider.collapsed ? sider.leftMixCollapsedWidth : sider.leftMixWidth) + sider.leftMixChildMenuWidth;
	return setting.siderRealWidth;
});

const ev = useElementEvent(window);
ev.on("mousemove", ev => {
	if (
		(ev?.target as HTMLDivElement)?.className?.startsWith
		&& (ev?.target as HTMLDivElement)?.className?.startsWith("n-popover")
	)
		return;
	menu.currentActiveLeftMixMenuKey = "";
});
</script>

<template>
	<n-layout-sider
		v-if="show"
		class="sider"
		:class="setting.type"
		:width="siderWidth"
		:collapsed="setting.typeHas('left-mix') ? undefined : sider.collapsed"
		:collapsed-width="setting.typeHas('left-mix') ? undefined : sider.collapsedWidth"
		:inverted="sider.inverted"
		collapse-mode="width"
		@mousemove.stop=""
	>
		<!-- 通用 -->
		<logo
			v-if="setting.typeHas('left', 'left-mix', 'mini')"
			:icon-width="commonLogoWidth"
			:show-title="showCommonLogoTitle"
			:style="{
				height: `${header.height}px`,
			}"
			:title-width="setting.typeHas('left-mix') ? undefined : '0px'"
		/>
		<!-- 左菜单混合模式独有 -->
		<logo
			v-if="setting.typeHas('left-mix')"
			show-title
			:show-icon="false"
			:style="{
				height: `${header.height}px`,
			}"
			justify="between"
			p="x-8px"
		>
			<template #suffix>
				<n-button text @click="sider.leftMixFixed = !sider.leftMixFixed">
					<div v-if="!sider.leftMixFixed" class="i-ph-push-pin-simple-fill" />
					<div v-else class="i-ph-push-pin-simple-slash-fill" />
				</n-button>
			</template>
		</logo>

		<!-- 左菜单混合模式独有 -->
		<n-scrollbar v-if="setting.typeHas('left-mix')">
			<n-menu
				class="left-mix"
				:class="sider.collapsed && 'collapsed'"
				:value="menu.currentActiveLeftMixMenuKey || menu.currentActiveTopLevelMenu?.key"
				:options="menu.topLevelMenuOptions"
				:collapsed="sider.collapsed"
				:style="{
					width: `${sider.collapsed ? sider.leftMixCollapsedWidth : sider.leftMixWidth}px`,
				}"
				:inverted="sider.inverted"
				@select="menu.currentActiveLeftMixMenuKey = $event"
			/>
		</n-scrollbar>

		<!-- 通用 -->
		<n-scrollbar>
			<n-menu
				:value="menu.currentActiveMenuKey"
				:options="commonMenuOptions"
				:inverted="sider.inverted"
				:collapsed="setting.typeHas('left-mix') ? undefined : sider.collapsed"
				:collapsed-width="setting.type == 'left-mix' ? sider.leftMixCollapsedWidth : sider.collapsedWidth"
			/>
		</n-scrollbar>

		<teleport to="body">
			<!-- <div> -->
			<transition name="fade">
				<div
					v-show="setting.type == 'mini' && !sider.collapsed"
					class="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-1100"
					@click="sider.collapsed = true"
				/>
			</transition>
			<!-- </div> -->
		</teleport>
	</n-layout-sider>
</template>

<style lang="less" scoped>
.n-layout-sider.sider {
	z-index: 1200;
	transition: all 0.3s var(--cubic-bezier-ease-in-out);
	box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);

	& > :deep(.n-layout-sider-scroll-container) {
		display: grid;
		grid-template-rows: max-content 1fr;
		overflow-x: hidden !important;
	}

	&.left {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
	}

	&.mini {
		position: fixed;
		top: 0;
		bottom: 0;
		left: var(--sider-mini-left);
	}

	&.top-mix,
	&.top-mix-split {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		padding-top: var(--header-height);
	}

	&.left-mix {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;

		& > :deep(.n-layout-sider-scroll-container) {
			grid-template-columns: max-content 1fr;
		}
	}

	:deep(.n-menu.left-mix) {
		transition: all 0.3s var(--cubic-bezier-ease-in-out);

		& > .n-menu-item {
			height: auto !important;

			& > .n-menu-item-content {
				display: flex !important;
				flex-direction: column !important;
				align-items: center !important;
				justify-content: center !important;
				padding: 4px 0 !important;
				// padding: 0 !important;

				& > .n-menu-item-content__icon {
					margin: 0 !important;
				}

				& > .n-menu-item-content-header {
					height: 1.75em;
					// display: none !important;
					transition: all 0.3s;
					line-height: 1.75;
				}
			}
		}

		&.collapsed {
			& > .n-menu-item {
				& > .n-menu-item-content {
					& > .n-menu-item-content-header {
						// height: 0 !important;
						height: 0;
					}
				}
			}
		}
	}
}
</style>
