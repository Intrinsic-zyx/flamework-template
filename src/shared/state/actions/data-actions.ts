import type { BroadcastMetadata, PlayerMetadata } from "../metadata";
import type { Data } from "shared/types/data";

export type DataActions<S> = {
	dataPlayerAdded: (state: S, payload: DataPlayerAdded, metadata: PlayerMetadata & BroadcastMetadata) => S;
	dataPlayerRemoving: (state: S, payload: DataPlayerRemoving, metadata: PlayerMetadata) => S;
};

export interface DataPlayerAdded {
	data: Data;
}

export type DataPlayerRemoving = undefined;
