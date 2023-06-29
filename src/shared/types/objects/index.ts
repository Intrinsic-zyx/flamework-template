import { Flamework } from "@flamework/core";
import type { Listener } from "./listener";

export const isListener = Flamework.createGuard<Listener<unknown>>();

export type { Listener };
