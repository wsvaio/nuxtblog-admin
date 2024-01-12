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

    name: "",
    username: "",
    role: 0,
  }),
  actions: {
    async syncUser() {
      merge(this.$state, await adminInfo());
    },

    async login(body: Record<any, any>) {
      const token = await adminLogin({ body });
      merge(this.$state, { accessToken: token });
      this.syncUser();
    },

    logout() {
      merge(this.$state, { accessToken: "", refreshToken: "", name: "", username: "", role: 0 });

      // const tab = useTabStore();
      // tab.includes.length = 0;
      // tab.excludes.length = 0;
      // this.removeRoute();
      // router.push("/login");
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
      return !!this.accessToken;
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
        } else {
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
