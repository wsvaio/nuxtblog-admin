import { Progress, merge } from "@wsvaio/utils";
import { createByNativeFetch, exec } from "@wsvaio/api";
import { router } from "@/modules/vue-router";

const { DEV, VITE_BASE_API } = import.meta.env;
export const { post, get, put, patch, del, request, use } = createByNativeFetch<{
  sucMsg?: boolean | string; // 操作成功时的消息
  errMsg?: boolean | string; // 操作失败时的消息
  b?: Record<any, any>;
  q?: Record<any, any>;
  p?: Record<any, any>;
}>({
  base: DEV ? "/api" : VITE_BASE_API,
  log: DEV,

  errMsg: true,
});

use("before")(async () => Progress.start());

use("before")(async ctx => {
  ctx.q && merge(ctx.query, ctx.q);
  // ctx.b && !ctx.body && (ctx.body = ctx.b);
  ctx.b && !ctx.body && (ctx.body = ctx.b);
  ctx.p && merge(ctx.param, ctx.p);
});

use("before")(async ctx => {
  const auth = useAuthStore();
  // ctx.headers.Authorization = `Bearer ${auth.accessToken}`;
  ctx.headers.Authorization = auth.accessToken;
});

use("error")(async ctx => {
  // if (ctx.status == 500)
  // 	router.replace("/error/500");
  // if (ctx.status == 403)
  // 	router.replace("/error/403");
  if (ctx.status == 404) router.replace("/error/404");
});

// 登录认证逻辑
use("error")(async ctx => {
  if (ctx?.data?.code != 401) return;
  if (ctx.path.startsWith("/authorize/refresh-token") || ctx.path.startsWith("/authorize/token")) return;
  // const auth = useAuthStore();
  // await auth.setRefreshToken();
  await exec(ctx);
});

use("error")(async ctx => {
  if (ctx?.data?.code != 403) return;
  const auth = useAuthStore();
  if (ctx.path.startsWith("/authorize/refresh-token")) auth.logout();
});

use("final")(async ctx => Progress.done(!ctx.error));

// 统一message
use("final")(async ctx => {
  ctx.message =  ctx.data?.message || ctx.error?.message || ctx.message;
});
// 成功提示
use("final")(async ctx => {
  if (!ctx.sucMsg || ctx.error) return;
  const message = ctx.sucMsg === true || typeof ctx.sucMsg !== "string" ? ctx.message : ctx.sucMsg;
  if (!message) return;
  const feedback = useFeedbackStore();
  feedback.message.success(message);
});
// 错误提示
use("final")(async ctx => {
  if (!ctx.errMsg || !ctx.error) return;
  const message = ctx.errMsg === true || typeof ctx.errMsg !== "string" ? ctx.message : ctx.errMsg;
  if (!message) return;
  const feedback = useFeedbackStore();
  feedback.message.error(message);
});
