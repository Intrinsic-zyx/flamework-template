import { ThemeConfig } from ".";

export const lightTheme: ThemeConfig<"theme:light"> = {
	theme_id: "theme:light",
	theme_name: "Light Theme",
	theme_colors: {
		"theme_color:primary_background": Color3.fromRGB(255, 255, 255),
		"theme_color:secondary_background": Color3.fromRGB(225, 225, 225),
		"theme_color:primary_text_color": Color3.fromRGB(0, 0, 0),
		"theme_color:secondary_text_color": Color3.fromRGB(35, 35, 35),
		"theme_color:stroke_color": Color3.fromRGB(75, 75, 75),
		"theme_color:hover_color": Color3.fromRGB(25, 25, 25),
		"theme_color:complete_color": Color3.fromRGB(255, 255, 255),
		"theme_color:color_contrast": Color3.fromRGB(0, 0, 0),
	},
	theme_values: {
		"theme_value:background_transparency": 0.75,
		"theme_value:corner_radius": 3,
		"theme_value:stroke_transparency": 0,
		"theme_value:stroke_thickness": 1,
		"theme_value:text_transparency": 0,
		"theme_value:large_text_size": 18,
		"theme_value:medium_text_size": 14,
		"theme_value:small_text_size": 12,
	},
};
