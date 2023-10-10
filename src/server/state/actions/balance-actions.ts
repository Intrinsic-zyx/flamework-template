import type { BroadcastMetadata, PlayerMetadata } from "shared/state/metadata";
import type { DataActions } from "shared/state/actions";

export type BalanceActions<S> = {
	balanceAddCoins: (state: S, payload: BalanceAddCoins, metadata: BroadcastMetadata & PlayerMetadata) => S;
	balanceRemoveCoins: (state: S, payload: BalanceRemoveCoins, metadata: BroadcastMetadata & PlayerMetadata) => S;
	balanceAddGems: (state: S, payload: BalanceAddGems, metadata: BroadcastMetadata & PlayerMetadata) => S;
	balanceRemoveGems: (state: S, payload: BalanceRemoveGems, metadata: BroadcastMetadata & PlayerMetadata) => S;
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
