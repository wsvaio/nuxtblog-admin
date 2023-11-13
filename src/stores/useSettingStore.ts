import { defineStore } from "pinia";

export default defineStore("layout", {
	state: () => ({
		primaryColor: "#457DFF",
		infoColor: "#096dd9",
		successColor: "#1CAE74",
		warningColor: "#faad14",
		errorColor: "#f5222d",

		isDark: false,
		type: "left" as "left" | "top" | "top-mix" | "top-mix-split" | "left-mix" | "mini",
		followSystemTheme: true,
		customizeDarkModeTransition: true,

		globalLoading: false,

		page: {
			scrollMode: "wrapper" as "wrapper" | "content",
			animate: true,
			animateMode: "fade",
			animationDuration: 300,
			animationIntensity: 10,
		},

		sider: {
			inverted: false,
			collapsed: false,

			width: 220,
			collapsedWidth: 64,

			leftMixFixed: false,
			leftMixWidth: 80,
			leftMixCollapsedWidth: 48,
			leftMixChildMenuWidth: 200,
		},
		header: {
			inverted: false,
			height: 56,
			fixed: true,
			crumbVisible: true,
			crumbShowIcon: true,
			menuPosition: "left" as "left" | "center" | "right",
		},
		tab: {
			visible: true,
			height: 48,
			isCache: true,
			fixed: true,
		},
		content: {},
		footer: {
			visible: true,
			fixed: false,
			height: 36,
			inverted: false,
		},

		overwriteThemeVars: {} as Record<any, any>,
	}),
	actions: {
		typeHas(...types: ("left" | "top" | "top-mix" | "left-mix" | "mini" | "top-mix-split")[]) {
			return types.some(item => item == this.type);
		},
	},
	getters: {
		siderRealWidth(): number {
			const menu = useMenuStore();
			if (this.type == "top-mix-split") if (!menu.currentActiveTopLevelMenu?.children?.length) return 0;

			return this.type == "left-mix"
				? (this.sider.collapsed ? this.sider.leftMixCollapsedWidth : this.sider.leftMixWidth)
						+ (this.sider.leftMixFixed ? this.sider.leftMixChildMenuWidth : 0)
				: this.type == "mini"
					? this.sider.width
					: this.sider.collapsed
						? this.sider.collapsedWidth
						: this.sider.width;
		},

		siderMiniLeft(): number {
			return this.type == "mini" && this.sider.collapsed ? -this.siderRealWidth : 0;
		},

		themeVars(): Record<any, any> {
			const t = {
				...generateColor(
					[
						["primaryColor", this.primaryColor],
						["infoColor", this.infoColor],
						["successColor", this.successColor],
						["warningColor", this.warningColor],
						["errorColor", this.errorColor],
					],
					this.isDark
				),
				...naiveUiBaseVars,

				headerHeight: `${this.header.height}px`,
				tabHeight: `${this.tab.height}px`,
				contentHeight: `calc(100dvh - ${
					this.header.height + (this.tab.visible ? this.tab.height : 0) + (this.footer.visible ? this.footer.height : 0)
				}px)`,
				containerHeight: "calc(var(--content-height) - 2 * var(--spacing))",
				footerHeight: `${this.footer.height}px`,

				siderRealWidth: `${this.siderRealWidth}px`,
				siderMiniLeft: `${this.siderMiniLeft}px`,

				spacingXxs: "4px",
				spacingXs: "8px",
				spacingSm: "12px",
				spacingMd: "16px",
				spacingLg: "24px",
				spacingXl: "32px",
				spacingXxl: "48px",

				spacing: "var(--spacing-md)",

				fontSizeXxl: "32px",
				fontSizeXl: "24px",
				fontSizeLg: "18px",
				fontSizeMd: "16px",
				fontSizeSm: "14px",
				fontSizeXs: "12px",
				fontSizeXxs: "8px",

				xxl: "1440px",
				xl: "1280px",
				lg: "960px",
				md: "768px",
				sm: "574px",
				xs: "375px",
				xxs: "256px",

				...this.overwriteThemeVars,
			};
			return !this.isDark
				? {
					...naiveUiBaseLightVars,

					siderBgColor: "#fff",
					headerBgColor: "#fff",
					tabBgColor: "#f7f9f8",
					contentBgColor: "#f7f9f8",
					footerBgColor: "#f7f9f8",

					bgColor: "#fff",
					thColor: "#F7F9FF",
					// tabBgColor: "#fff",
					// contentBgColor: "#f7f9f8",
					// footerBgColor: "#fff",
					...t,
				  }
				: {
					...naiveUiBaseDarkVars,

					siderBgColor: "#18181c",
					headerBgColor: "#18181c",
					tabBgColor: "#101014",
					contentBgColor: "#101014",
					footerBgColor: "#101014",

					bgColor: "#18181c",

					thColor: "#26262A",

					...t,
				  };
		},
	},
	persist: true,
});
