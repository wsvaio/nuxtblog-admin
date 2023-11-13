import type { MenuOption } from "naive-ui";
import { defineStore } from "pinia";
import { type RouteRecordRaw, RouterLink } from "vue-router";
import Icones from "@/components/icones/index.vue";

const label = (item: RouteRecordRaw) => {
	return item?.component
		? () =>
			h(
				RouterLink,
				{
					to: {
						path: item.path,
					},
				},
				{ default: () => item.meta?.title }
			)
		: item.meta?.title;
};
export default defineStore("menu", {
	state: () => ({
		currentActiveMenuKey: "",
		currentActiveLeftMixMenuKey: "",
	}),
	actions: {},
	getters: {
		menuOptions(): MenuOption[] {
			const auth = useAuthStore();
			return deepMap(auth.routes, item => {
				let children = item.children?.filter(sub => sub.meta?.show != false);
				children = children?.length ? children : undefined;
				return {
					label: label(item),
					icon: item.meta?.icon ? () => h(Icones, { name: item.meta?.icon }) : undefined,
					key: String(item.name),
					show: item.meta?.show,
					disabled: item.meta?.disabled,
					children,
				};
			});
		},

		currentActiveTopLevelMenu(): MenuOption | undefined {
			return this.menuOptions.find(item => this.currentActiveMenuKey.startsWith(String(item.key)));
		},
		subMenuOptions(): MenuOption[] {
			return this.currentActiveTopLevelMenu?.children || [];
		},
		topLevelMenuOptions(): MenuOption[] {
			return this.menuOptions.map(item => ({ ...item, children: undefined }));
		},

		currentActiveTopLevelLeftMixMenu(): MenuOption | undefined {
			return this.menuOptions.find(item => this.currentActiveLeftMixMenuKey.startsWith(String(item.key)));
		}
	},
});
