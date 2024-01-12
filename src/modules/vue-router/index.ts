import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";
import { Progress, sleep } from "@wsvaio/utils";
import { parseQuery, stringifyQuery } from "./query";
import routes from "@/routes";

export const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE),
	routes,
	parseQuery,
	stringifyQuery,
});

router.beforeEach(() => Progress.start());

// 未登录的页面跳转
// router.beforeEach((to, _from, next) => {
// 	const auth = useAuthStore();
// 	if (auth.whites.includes(to.path) && !to.redirectedFrom) return next();
// 	const { isLogin } = useAuthStore();
// 	if (to.path.startsWith("/login")) isLogin ? next("/") : next();
// 	else isLogin ? next() : next("/login");
// });

// 注册路由
router.beforeEach(async (to, _from, next) => {
	const auth = useAuthStore();
	const setting = useSettingStore();
	// if (auth.routes.length || !auth.isLogin) return next();
  if (auth.routes.length) return next();
	setting.globalLoading = true;
	await auth
		.addOrReplaceRoute()
		.then(() => {
			to.redirectedFrom ? next(to.redirectedFrom) : next();
		})
		.catch(() => {
			next("/500");
		})
		.finally(async () => {
			await sleep(1);
			setting.globalLoading = false;
		});
});
// 设置动态tabName
router.beforeEach(async to => {
	if (to.query.tabName) to.meta.tabName = to.query.tabName as string;
});

router.afterEach(() => Progress.clear());

export default (app: App) => app.use(router);
