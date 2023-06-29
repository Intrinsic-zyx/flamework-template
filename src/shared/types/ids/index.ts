import { Flamework } from "@flamework/core";
import type { ThemeIds } from "./theme-ids";

export const isThemeId = Flamework.createGuard<ThemeIds>();

export type { ThemeIds };
