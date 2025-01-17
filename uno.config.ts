// uno.config.ts
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetUno,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

export default defineConfig({
	content: {
		pipeline: {
			exclude: ["node_modules", "dist", ".git", ".husky", ".vscode", "public", "build", "mock", "./stats.html"],
		},
	},
	presets: [presetUno({ dark: "class" }), presetAttributify(), presetIcons()],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	shortcuts: {
		"wh-full": "w-full h-full",
		"flex-center": "flex justify-center items-center",
		"flex-col-center": "flex-center flex-col",
		"flex-x-center": "flex justify-center",
		"flex-y-center": "flex items-center",
		"i-flex-center": "inline-flex justify-center items-center",
		"i-flex-x-center": "inline-flex justify-center",
		"i-flex-y-center": "inline-flex items-center",
		"flex-col": "flex flex-col",
		"flex-col-stretch": "flex-col items-stretch",
		"i-flex-col": "inline-flex flex-col",
		"i-flex-col-stretch": "i-flex-col items-stretch",
		"flex-1-hidden": "flex-1 overflow-hidden",
		"absolute-lt": "absolute left-0 top-0",
		"absolute-lb": "absolute left-0 bottom-0",
		"absolute-rt": "absolute right-0 top-0",
		"absolute-rb": "absolute right-0 bottom-0",
		"absolute-tl": "absolute-lt",
		"absolute-tr": "absolute-rt",
		"absolute-bl": "absolute-lb",
		"absolute-br": "absolute-rb",
		"absolute-center": "absolute-lt flex-center wh-full",
		"fixed-lt": "fixed left-0 top-0",
		"fixed-lb": "fixed left-0 bottom-0",
		"fixed-rt": "fixed right-0 top-0",
		"fixed-rb": "fixed right-0 bottom-0",
		"fixed-tl": "fixed-lt",
		"fixed-tr": "fixed-rt",
		"fixed-bl": "fixed-lb",
		"fixed-br": "fixed-rb",
		"fixed-center": "fixed-lt flex-center wh-full",
		"nowrap-hidden": "whitespace-nowrap overflow-hidden",
		"ellipsis-text": "nowrap-hidden text-ellipsis",
		"transition-base": "transition-all duration-300 ease-in-out",
	},
	theme: {
		colors: {
			primary: "var(--primary-color)",
			primary_hover: "var(--primary-color-hover)",
			primary_pressed: "var(--primary-color-pressed)",
			primary_active: "rgba(var(--primary-color-active)",
			primary_1: "var(--primary-color1)",
			primary_2: "var(--primary-color2)",
			primary_3: "var(--primary-color3)",
			primary_4: "var(--primary-color4)",
			primary_5: "var(--primary-color5)",
			primary_6: "var(--primary-color6)",
			primary_7: "var(--primary-color7)",
			primary_8: "var(--primary-color8)",
			primary_9: "var(--primary-color9)",
			primary_10: "var(--primary-color10)",
			info: "var(--info-color)",
			info_hover: "var(--info-color-hover)",
			info_pressed: "var(--info-color-pressed)",
			info_active: "var(--info-color-active)",
			info_1: "var(--info-color1)",
			info_2: "var(--info-color2)",
			info_3: "var(--info-color3)",
			info_4: "var(--info-color4)",
			info_5: "var(--info-color5)",
			info_6: "var(--info-color6)",
			info_7: "var(--info-color7)",
			info_8: "var(--info-color8)",
			info_9: "var(--info-color9)",
			info_10: "var(--info-color10)",
			success: "var(--success-color)",
			success_hover: "var(--success-color-hover)",
			success_pressed: "var(--success-color-pressed)",
			success_active: "var(--success-color-active)",
			success_1: "var(--success-color1)",
			success_2: "var(--success-color2)",
			success_3: "var(--success-color3)",
			success_4: "var(--success-color4)",
			success_5: "var(--success-color5)",
			success_6: "var(--success-color6)",
			success_7: "var(--success-color7)",
			success_8: "var(--success-color8)",
			success_9: "var(--success-color9)",
			success_10: "var(--success-color10)",
			warning: "var(--warning-color)",
			warning_hover: "var(--warning-color-hover)",
			warning_pressed: "var(--warning-color-pressed)",
			warning_active: "var(--warning-color-active)",
			warning_1: "var(--warning-color1)",
			warning_2: "var(--warning-color2)",
			warning_3: "var(--warning-color3)",
			warning_4: "var(--warning-color4)",
			warning_5: "var(--warning-color5)",
			warning_6: "var(--warning-color6)",
			warning_7: "var(--warning-color7)",
			warning_8: "var(--warning-color8)",
			warning_9: "var(--warning-color9)",
			warning_10: "var(--warning-color10)",
			error: "var(--error-color)",
			error_hover: "var(--error-color-hover)",
			error_pressed: "var(--error-color-pressed)",
			error_active: "var(--error-color-active)",
			error_1: "var(--error-color1)",
			error_2: "var(--error-color2)",
			error_3: "var(--error-color3)",
			error_4: "var(--error-color4)",
			error_5: "var(--error-color5)",
			error_6: "var(--error-color6)",
			error_7: "var(--error-color7)",
			error_8: "var(--error-color8)",
			error_9: "var(--error-color9)",
			error_10: "var(--error-color10)",
			// dark: "#18181c",
			dark: "var(--dark-color)",
		},
	},
});
