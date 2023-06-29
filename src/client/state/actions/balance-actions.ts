import { BroadcastMetadata } from "shared/state/metadata";
import { Data } from "shared/types/data";

export type BalanceActions<S> = {
	loadPlayerData: (state: S, payload: LoadPlayerData, metadata: BroadcastMetadata) => S;
	balanceAddCoins: (state: S, payload: BalanceAddCoins, metadata: BroadcastMetadata) => S;
	balanceRemoveCoins: (state: S, payload: BalanceRemoveCoins, metadata: BroadcastMetadata) => S;
	balanceAddGems: (state: S, payload: BalanceAddGems, metadata: BroadcastMetadata) => S;
	balanceRemoveGems: (state: S, payload: BalanceRemoveGems, metadata: BroadcastMetadata) => S;
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
