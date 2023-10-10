import type { BroadcastMetadata } from "shared/state/metadata";
import type { DataActions } from "shared/state/actions";

export type BalanceActions<S> = {
	balanceAddCoins: (state: S, payload: BalanceAddCoins, metadata: BroadcastMetadata) => S;
	balanceRemoveCoins: (state: S, payload: BalanceRemoveCoins, metadata: BroadcastMetadata) => S;
	balanceAddGems: (state: S, payload: BalanceAddGems, metadata: BroadcastMetadata) => S;
	balanceRemoveGems: (state: S, payload: BalanceRemoveGems, metadata: BroadcastMetadata) => S;
} & DataActions<S>;

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
