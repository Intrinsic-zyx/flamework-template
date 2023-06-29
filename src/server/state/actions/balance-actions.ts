import { BroadcastMetadata, PlayerMetadata } from "shared/state/metadata";
import { Data } from "shared/types/data";

export type BalanceActions<S> = {
	loadPlayerData: (state: S, payload: LoadPlayerData, metadata: BroadcastMetadata & PlayerMetadata) => S;
	closePlayerData: (state: S, payload: undefined, metadata: PlayerMetadata) => S;
	balanceAddCoins: (state: S, payload: BalanceAddCoins, metadata: BroadcastMetadata & PlayerMetadata) => S;
	balanceRemoveCoins: (state: S, payload: BalanceRemoveCoins, metadata: BroadcastMetadata & PlayerMetadata) => S;
	balanceAddGems: (state: S, payload: BalanceAddGems, metadata: BroadcastMetadata & PlayerMetadata) => S;
	balanceRemoveGems: (state: S, payload: BalanceRemoveGems, metadata: BroadcastMetadata & PlayerMetadata) => S;
};

export interface LoadPlayerData {
	data: Data;
}

export interface BalanceAddCoins {
	add: number;
}

export interface BalanceRemoveCoins {
	remove: number;
}

export interface BalanceAddGems {
	add: number;
}

export interface BalanceRemoveGems {
	remove: number;
}
