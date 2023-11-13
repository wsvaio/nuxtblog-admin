import { defineStore } from "pinia";
import type { RouteLocationNormalizedLoaded, RouteRecordName } from "vue-router";

export default defineStore("tab", {
	state: () => ({
		tabs: [] as RouteLocationNormalizedLoaded[],
		excludes: [] as (RouteRecordName | undefined | null)[],
		includes: [] as (RouteRecordName | undefined | null)[],
		isRouteView: true,
	}),
	actions: {
		insert(index: number, route: RouteLocationNormalizedLoaded) {
			this.tabs.splice(index, 0, { ...route });
		},
		append(route: RouteLocationNormalizedLoaded) {
			if (!this.tabs.find(item => item.fullPath == route.fullPath)) this.tabs.push({ ...route });
		},
		replace(route: RouteLocationNormalizedLoaded) {
			const index = this.tabs.findIndex(item => item.fullPath == route.fullPath);
			if (index != -1) {
				this.insert(index, route);
				this.delete(route.fullPath);
			}
		},
		appendOrReplace(route?: RouteLocationNormalizedLoaded) {
			if (!route) return;
			const index = this.tabs.findIndex(item => item.fullPath == route.fullPath);
			if (index != -1) this.replace(route);
			else this.append(route);
		},
		delete(fullPath?: string) {
			const index = this.tabs.findIndex(item => item.fullPath == fullPath);
			if (index != -1) this.tabs.splice(index, 1);
		},
		setTabName(fullPath?: string, tabName?: string) {
			const finded = this.tabs.find(item => item.fullPath == fullPath);
			if (finded) finded.meta.tabName = tabName;
		},
		setCurrentTabName(tabName?: string) {
			const route = useRoute();
			this.setTabName(route.fullPath, tabName);
		},

		async refresh(name?: RouteRecordName | null) {
			if (!name) return;
			this.excludes.push(name);
			await nextTick();
			this.isRouteView = false;
			await nextTick();
			this.isRouteView = true;
			this.excludes.pop();
		},
	},
	getters: {
		include(): string[] {
			return [
				...this.includes.map(item => String(item)),
				...this.tabs
					.map(item => item.name)
					.filter(item => !!item)
					.map(item => String(item)),
			];
		},
		exclude(): string[] {
			return this.excludes.filter(item => !!item).map(item => String(item));
		},
	},
});
