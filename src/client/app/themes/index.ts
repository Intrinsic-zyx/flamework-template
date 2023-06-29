import { ThemeIds } from "shared/types/ids";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

type ThemeColors =
	| "theme_color:primary_background"
	| "theme_color:secondary_background"
	| "theme_color:primary_text_color"
	| "theme_color:secondary_text_color"
	| "theme_color:stroke_color"
	| "theme_color:hover_color"
	| "theme_color:complete_color"
	| "theme_color:color_contrast";

type ThemeValues =
	| "theme_value:background_transparency"
	| "theme_value:corner_radius"
	| "theme_value:stroke_transparency"
	| "theme_value:stroke_thickness"
	| "theme_value:text_transparency"
	| "theme_value:large_text_size"
	| "theme_value:medium_text_size"
	| "theme_value:small_text_size";

export interface ThemeConfig<T extends ThemeIds> {
	theme_id: T;
	theme_name: string;
	theme_colors: Record<ThemeColors, Color3>;
	theme_values: Record<ThemeValues, number>;
}

export const themeConfigs: { [K in ThemeIds]: ThemeConfig<K> } = {
	"theme:dark": darkTheme,
	"theme:light": lightTheme,
};
