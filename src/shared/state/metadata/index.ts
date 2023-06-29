import { Flamework } from "@flamework/core";
import type { BroadcastMetadata } from "./broadcast-metadata";
import type { PlayerMetadata } from "./player-metadata";

export const isBroadcastMetadata = Flamework.createGuard<BroadcastMetadata>();
export const isPlayerMetadata = Flamework.createGuard<PlayerMetadata>();

export type { BroadcastMetadata, PlayerMetadata };
