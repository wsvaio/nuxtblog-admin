import { Progress } from "@wsvaio/utils";
import { createByNativeFetch } from "@wsvaio/api";

const { get, use } = createByNativeFetch<{
	progress: boolean;
}>({
	base: "https://api.iconify.design",
	log: import.meta.env.DEV, // 控制台是否打印日志
	progress: true,
	timeout: 10000,
});

use("before")(async ctx => ctx.progress && Progress.start());

use("final")(async ctx => ctx.progress && Progress.done(!ctx.error));

export const iconifySearch = get("/search");

export const iconifyRaw = get({
	url: "/:name.svg",
	progress: false,
	log: false,
	dataType: "text",
});

// let currentIconifyRaw: Promise<any>;
// export const iconifyRaw = (...ctx: Parameters<typeof get>) => {
// 	const result = get<any>({
// 		url: "/:name.svg",
// 		progress: false,
// 		log: false,
// 		dataType: "text",
// 		befores: [
// 			async () => {
// 				const c = currentIconifyRaw;
// 				currentIconifyRaw = result;
// 				if (c)
// 					await c.catch(() => "恭喜你发现彩蛋");
// 			}
// 		],
// 		finals: [
// 			async () => {

// 				// currentIconifyRaw = result;
// 			}
// 		],
// 		...ctx[0],
// 	});
// 	return result;
// };
