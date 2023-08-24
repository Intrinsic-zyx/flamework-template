import { Flamework } from "@flamework/core";
import type { Character } from "./character";
import type { Listener } from "./listener";

export const isCharacter = Flamework.createGuard<Character>();
export const isListener = Flamework.createGuard<Listener<unknown>>();

export type { Character, Listener };
