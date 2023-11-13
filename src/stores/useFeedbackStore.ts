import type { ConfigProviderProps } from "naive-ui";
import { createDiscreteApi, darkTheme, lightTheme } from "naive-ui";
import { defineStore } from "pinia";

export default defineStore("feedback", {
	state: () => {
		const setting = useSettingStore();
		const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
			theme: !setting.isDark ? lightTheme : darkTheme,
		}));
		const { message } = createDiscreteApi(["message"], {
			configProviderProps: configProviderPropsRef,
		});
		return {
			message
		};
	},
	actions: {},
	getters: {},
});
