const init = () => {
	const html = document.documentElement;
	const setting = useSettingStore();

	// 同步dark到html上
	watchEffect(() => {
		html.classList.remove("dark");
		if (setting.isDark) html.classList.add("dark");
	});

	// 同步cssvars到html上
	watchEffect(() => {
		for (const [k, v] of Object.entries(setting.themeVars))
			html.style.setProperty(`--${k.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`)}`, v);
	});

	// 监测显示区域宽度，更改是否移动端布局
	const handleIsMini = () => {
		const { clientWidth } = document.documentElement;
		if (clientWidth > 768) {
			if (setting.type != "mini") return;
			setting.type = "left";
			setting.sider.collapsed = false;
		}
		else {
			setting.type = "mini";
			setting.sider.collapsed = true;
		}
	};
	handleIsMini();
	window.addEventListener("resize", handleIsMini);

	// 暗黑模式
	const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
	const setIsDark = (isLightMatches: boolean) => {
		if (!setting.followSystemTheme) return;
		setting.isDark = !isLightMatches;
	};
	setIsDark(themeMedia.matches);
	themeMedia.addEventListener("change", e => setIsDark(e.matches));
};

export default () => {
	init();

	const auth = useAuthStore();
	// const perm = usePermStore();
	if (auth.isLogin) auth.syncUser();
	// perm.SysPermissionTreeList();
};
