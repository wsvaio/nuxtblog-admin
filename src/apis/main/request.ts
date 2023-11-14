import { Progress } from "@wsvaio/utils";
import { createAPI, normalize, run } from "@wsvaio/api";
import { router } from "@/modules/vue-router";

const { DEV, VITE_BASE_API } = import.meta.env;
export const { post, get, put, patch, del, request, use, extendAPI } = createAPI<{
	sucMsg?: boolean | string; // 操作成功时的消息
	errMsg?: boolean | string; // 操作失败时的消息
}>({
	baseURL: DEV ? "/api" : VITE_BASE_API,
	log: DEV,

	errMsg: true,
});

use("before")(async () => Progress.start());

use("before")(async ctx => {
	const auth = useAuthStore();
	ctx.headers.Authorization = `Bearer ${auth.accessToken}`;
});

use("after")(async ctx => {
	if (typeof ctx.data?.code != "number") return;
	if (ctx.data?.code != 200) throw new Error(ctx.data?.msg);
	ctx.data = ctx.data.data;
});

use("error")(async ctx => {
	if (ctx.message === "Failed to fetch") ctx.message = "网络错误";
});

use("error")(async ctx => {
	// if (ctx.status == 500)
	// 	router.replace("/error/500");
	// if (ctx.status == 403)
	// 	router.replace("/error/403");
	if (ctx.status == 404)
		router.replace("/error/404");
});

// 登录认证逻辑
use("error")(async ctx => {
	if (ctx?.data?.code != 401) return;
	if (ctx.url.startsWith("/authorize/refresh-token") || ctx.url.startsWith("/authorize/token")) return;
	const auth = useAuthStore();
	await auth.setRefreshToken();
	normalize(ctx);
	await run(ctx);
});

use("error")(async ctx => {
	if (ctx?.data?.code != 403) return;
	const auth = useAuthStore();
	if (ctx.url.startsWith("/authorize/refresh-token"))
		auth.logout();
});

use("final")(async ctx => Progress.done(!ctx.error));

// 统一message
use("final")(async ctx => {
	const data = ctx?.response?.data as AnyObject;
	if (data?.code == 400) {
		ctx.message = data?.data?.map(item => item.message)?.join("，");
	}
	else {
		ctx.message
			= data?.message || ctx.message;
	}
});
// 成功提示
use("final")(async ctx => {
	if (!ctx.sucMsg || ctx.error) return;
	const message = ctx.sucMsg === true || typeof ctx.sucMsg !== "string" ? ctx.message : ctx.sucMsg;
	const feedback = useFeedbackStore();
	feedback.message.success(message);
});
// 错误提示
use("final")(async ctx => {
	if (!ctx.errMsg || !ctx.error) return;
	const message = ctx.errMsg === true || typeof ctx.errMsg !== "string" ? ctx.message : ctx.errMsg;
	// showErrorNotice(message);
	const feedback = useFeedbackStore();
	feedback.message.error(message);
});
