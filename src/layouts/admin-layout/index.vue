<script setup lang="ts">
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";
import SiderView from "./views/sider/index.vue";
import HeaderView from "./views/header/index.vue";
import TabView from "./views/tab/index.vue";
import ContentView from "./views/content/index.vue";
import FooterView from "./views/footer/index.vue";

const setting = useSettingStore();
const route = useRoute();
const auth = useAuthStore();
const menu = useMenuStore();
const handleUpdate = (route: RouteLocationNormalizedLoaded | RouteRecordRaw) => {
	menu.currentActiveMenuKey
		= deepFind(auth.routes, item => item.path == route?.meta?.data?.currentActiveMenu)?.name || route.name;
};
onBeforeRouteUpdate(to => {
	handleUpdate(to);
	if (setting.typeHas("mini")) setting.sider.collapsed = true;
});
handleUpdate(route);
</script>

<template>
	<n-layout :class="[setting.type, setting.page.scrollMode]" class="admin" :native-scrollbar="false">
		<sider-view />
		<header-view />
		<tab-view />
		<content-view />
		<footer-view />
	</n-layout>
</template>

<style lang="less">
.n-layout.admin {
	& > .n-scrollbar {
		height: 100dvh;

		& > .n-scrollbar-rail {
			z-index: 9999;
		}

		& > .n-scrollbar-container > .n-scrollbar-content {
			// display: block !important;
			position: relative;
			min-height: 100dvh;
		}
	}

	&.mini {
		overflow: visible;

		& > .n-scrollbar {
			overflow: visible;

			& > .n-scrollbar-container {
				overflow: visible;

				& > .n-scrollbar-content {
					height: 100%;
					overflow: visible;
				}
			}
		}
	}
}
</style>
