import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { ergodic, merge } from "@wsvaio/utils";
import { router } from "@/modules/vue-router";
import { getDynamicRoutes, getStaticRoutes } from "@/routes";

export default defineStore("auth", {
	state: () => ({
		accessToken: "",
		refreshToken: "",
		persist: false,
		routes: [] as RouteRecordRaw[],
		whites: ["/404", "/403", "/500", "/login"],

		refreshTokenPromise: null as Promise<any> | null,
		companyName: null as string | null,
		name: null as string | null,
		userName: null as string | null,
		userId: null as string | null,
		companyId: null as string | null,
		safetyConstruction: null as number | null,
	}),
	actions: {
		async setRefreshToken() {
			if (this.refreshTokenPromise) return this.refreshTokenPromise;

			this.refreshTokenPromise = refreshToken({
				q: {
					refreshToken: this.refreshToken,
				},
				errMsg: false,
			});

			this.refreshTokenPromise.then(result => {
				merge(this.$state, { ...result });
			});
			this.refreshTokenPromise.finally(() => (this.refreshTokenPromise = null));
			return this.refreshTokenPromise;
		},

		async syncUser() {
			const data = await userDetail();
			merge(this.$state, data);
		},

		async login(body: Record<any, any>) {
			const data = await authorizeLogin({ body });
			merge(this.$state, data);
		},
		// async refresh() {
		//   const data = await authorizeRefreshToken({ body: { refreshToken: this.refreshToken } });
		//   merge(this.$state, data);
		// },
		logout() {
			this.$reset();

			const tab = useTabStore();
			tab.includes.length = 0;
			tab.excludes.length = 0;
			this.removeRoute();
			router.push("/login");
		},
		// 组合动态路由和静态路由
		async Routes() {
			this.routes = [];

			await getDynamicRoutes()
				.then(routeList => {
					this.routes.push(...routeList);
				})
				.finally(() => {
					this.routes.push(...getStaticRoutes());
					this.routes.sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0));
				});

			// this.routes.push(...getStaticRoutes());
			// this.routes.sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0));
		},

		removeRoute() {
			this.routes.length = 0;
			router.hasRoute("administrator") && router.removeRoute("administrator");
		},
		// 添加或替换路由到vue-router
		async addOrReplaceRoute() {
			router.hasRoute("admin-layout") && router.removeRoute("admin-layout");
			await this.Routes().finally(() => {
				const children = [] as any[];
				ergodic(
					this.routes,
					item => {
						if (item.path && item.component) children.push(item);
					},
					{ deep: Number.POSITIVE_INFINITY }
				);
				router.addRoute({
					path: "/",
					name: "admin-layout",
					redirect: () => children[0],
					component: () => import("@/layouts/admin-layout/index.vue"),
					children,
				});
			});
		},
	},
	getters: {
		isLogin(): boolean {
			return true;
			// return !!this.accessToken;
		},
	},

	persist: [
		{
			includes: ["persist"],
		},
		{
			includes: ["accessToken", "refreshToken"],
			setter(key, value) {
				if (this.persist) {
					localStorage.setItem(key, JSON.stringify(value));
					sessionStorage.removeItem(key);
				}
				else {
					sessionStorage.setItem(key, JSON.stringify(value));
					localStorage.removeItem(key);
				}
			},
			getter(key) {
				if (this.persist) return JSON.parse(localStorage.getItem(key) || "null");
				else return JSON.parse(sessionStorage.getItem(key) || "null");
			},
		},
	],
});
