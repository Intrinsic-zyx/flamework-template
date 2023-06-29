import { Flamework } from "@flamework/core";
import type { Character } from "./character";

export const isCharacter = Flamework.createGuard<Character>();

export type { Character };
