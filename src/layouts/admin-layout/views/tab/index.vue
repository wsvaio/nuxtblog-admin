<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";

const setting = useSettingStore();
const tab = useTabStore();
const { tabs } = $(tab);
const route = useRoute();
const router = useRouter();

const handleUpdate = (route: RouteLocationNormalizedLoaded) => {
	tab.append(route);
};

onBeforeRouteUpdate(to => handleUpdate(to));
handleUpdate(route);

const tabsRef = $ref<HTMLDivElement>();
const tabsScrollTo = (num: number) =>
	tabsRef?.scrollTo({
		behavior: "smooth",
		left: tabsRef?.scrollLeft + num,
	});
// const tabsScrollIntoView = (index: number) =>
// 	tabsRef?.children[index]?.scrollIntoView({
// 		behavior: "smooth",
// 		block: "center",
// 	});

let currentDragName: string = "";
const dragenter = (item: RouteLocationNormalizedLoaded) => {
	if (!currentDragName || currentDragName == item.fullPath) return;
	const index = tab.tabs.findIndex(sub => sub.fullPath == item.fullPath);
	const t = tab.tabs.find(sub => sub.fullPath == currentDragName);
	if (!t) return;
	tab.delete(currentDragName);
	tab.insert(index, t);
	currentDragName = "";
	setTimeout(() => (currentDragName = t.fullPath), 333);
};
const close = (item: RouteLocationNormalizedLoaded) => {
	tabs.splice(
		tab.tabs.findIndex(sub => sub.fullPath == item.fullPath),
		1
	);
	if (route.name == item.name) router.push([...tabs].reverse()[0]);
};

const handleSelect = (key: string) => {
	const index = tabs.findIndex(sub => sub.fullPath == route.fullPath);
	if (key == "重新加载") {
		router.go(0);
	}
	else if (key == "关闭标签页") {
		close(route);
	}
	else if (key == "关闭左侧标签页") {
		for (let i = 0; i < index; i++) tabs.shift();
	}
	else if (key == "关闭右侧标签页") {
		const length = tabs.length;
		for (let i = 0; i < length - index - 1; i++) tabs.pop();
	}
	else if (key == "关闭其他标签页") {
		handleSelect("关闭左侧标签页");
		handleSelect("关闭右侧标签页");
	}
};
</script>

<template>
	<div
		v-if="setting.tab.visible"
		class="tab"
		:class="[setting.type, setting.tab.fixed && 'fixed']"
		:style="{
			height: `${setting.tab.height}px`,
			top: setting.tab.fixed ? (setting.header.fixed ? `var(--header-height)` : 0) : undefined,
		}"
	>
		<n-button text @click="tabsScrollTo(-100)">
			<template #icon>
				<div class="i-ion:ios-arrow-right rotate-[180deg]" />
			</template>
		</n-button>
		<section
			ref="tabsRef"
			class="tabs"
			@mousewheel.prevent="tabsScrollTo($event.deltaY)"
			@dragenter.prevent=""
			@dragover.prevent=""
		>
			<transition-group name="tab">
				<n-tag
					v-for="(item, _index) in tabs"
					:key="item.fullPath!"
					draggable="true"
					:closable="tabs.length > 1"
					:bordered="false"
					:type="route.fullPath == item.fullPath ? 'primary' : 'default'"
					:style="{ '--n-color': 'var(--body-color)' }"
					@dragstart="currentDragName = item.fullPath"
					@dragenter.prevent="dragenter(item)"
					@dragover.prevent="dragenter(item)"
					@drop="dragenter(item)"
					@dragend="currentDragName = ''"
					@click="router.push(item)"
					@close="close(item)"
				>
					<!-- @click="tabsScrollIntoView(index), router.push(item)" -->
					<div flex="~ items-center">
						<!-- <div v-if="item.meta?.icon" :class="item.meta?.icon" text="[var(--spacing)]" mr=".5em" /> -->
						<icones v-if="item.meta.icon" :name="item.meta.icon" text="[var(--spacing)]" mr=".5em" />
						<div>{{ item.meta.tabName || item.meta?.title }}</div>
					</div>
				</n-tag>
			</transition-group>
		</section>

		<n-button text @click="tabsScrollTo(100)">
			<template #icon>
				<div class="i-ion:ios-arrow-right" />
			</template>
		</n-button>

		<n-dropdown
			:options="[
				{
					label: '重新加载',
					key: '重新加载',
					icon: () => h('div', { class: 'i-iconoir:refresh' }),
				},
				{
					label: '关闭标签页',
					key: '关闭标签页',
					disabled: tabs.length == 1,
					icon: () => h('div', { class: 'i-material-symbols:close-rounded' }),
				},
				{
					type: 'divider',
				},
				{
					label: '关闭左侧标签页',
					key: '关闭左侧标签页',
					disabled: tabs.findIndex(item => item.name == route.name) == 0,
					icon: () => h('div', { class: 'i-ph:arrow-line-left-thin' }),
				},
				{
					label: '关闭右侧标签页',
					key: '关闭右侧标签页',
					disabled: tabs.findIndex(item => item.name == route.name) == tabs.length - 1,
					icon: () => h('div', { class: 'i-ph:arrow-line-right-thin' }),
				},
				{
					type: 'divider',
				},
				{
					label: '关闭其他标签页',
					key: '关闭其他标签页',
					disabled: tabs.length == 1,
					icon: () => h('div', { class: 'i-carbon:subtract' }),
				},
			]"
			@select="handleSelect"
		>
			<n-button text>
				<template #icon>
					<div class="i-ion:ios-arrow-right rotate-[90deg]" />
				</template>
			</n-button>
		</n-dropdown>
	</div>
</template>

<style lang="less" scoped>
.tab {
	display: flex;
	z-index: 990;
	box-sizing: border-box;
	flex: none;
	align-items: center;
	height: 100%;
	padding: var(--spacing-xs) var(--spacing-xs);
	transition: all 0.3s var(--cubic-bezier-ease-in-out);
	background-color: var(--content-bg-color);
	// background-color: var(--body-color);
	// box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
	user-select: none;

	& > * {
		margin-right: 10px;

		&:last-child {
			margin-right: 0;
		}
	}

	&.fixed {
		position: sticky;
	}

	&.left,
	&.left-mix,
	&.top-mix,
	&.top-mix-split {
		padding-left: calc(var(--sider-real-width) + var(--spacing-xs));
	}

	& > section.tabs {
		display: flex;
		flex: 1;
		height: 100%;
		// overflow: hidden;
		overflow: auto;

		&::-webkit-scrollbar {
			display: none;
		}

		& > .n-tag {
			position: relative;
			height: 100%;
			margin-right: 6px;
			padding: 0 12px;
			transition: all 0.333s ease;
			cursor: pointer;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	.tab-enter-from,
	.tab-leave-to {
		transform: translateY(25%);
		opacity: 0;
	}
}
</style>
