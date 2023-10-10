import { createProducer } from "@rbxts/reflex";
import Immut from "@rbxts/immut";
import type {
	BalanceActions,
	BalanceAddCoins,
	BalanceAddGems,
	BalanceRemoveCoins,
	BalanceRemoveGems,
} from "server/state/actions";
import type { BalanceData } from "shared/types/data";
import type { BroadcastMetadata, PlayerMetadata } from "shared/state/metadata";
import type { DataPlayerAdded } from "shared/state/actions";

export interface BalancePlayerState {
	data: BalanceData;
}

export interface BalanceState {
	[user: string]: BalancePlayerState;
}

const balanceState: BalanceState = {};

export const balanceSlice = createProducer<BalanceState, BalanceActions<BalanceState>>(balanceState, {
	dataPlayerAdded: (
		state: BalanceState,
		payload: DataPlayerAdded,
		metadata: BroadcastMetadata & PlayerMetadata,
	): BalanceState => {
		const { data } = payload;
		const { balance } = data;
		const { user } = metadata;
		return Immut.produce(state, (draft: BalanceState): void => {
			draft[user] = { data: balance };
		});
	},
	dataPlayerRemoving: (state: BalanceState, payload: undefined, metadata: PlayerMetadata): BalanceState => {
		const { user } = metadata;
		return Immut.produce(state, (draft: BalanceState): void => {
			delete draft[user];
		});
	},
	balanceAddCoins: (
		state: BalanceState,
		payload: BalanceAddCoins,
		metadata: BroadcastMetadata & PlayerMetadata,
	): BalanceState => {
		const { add } = payload;
		const { user } = metadata;
		return Immut.produce(state, (draft: BalanceState): void => {
			const player = draft[user];
			if (player === undefined) {
				return;
			}
			const { data } = player;
			data.coins += add;
		});
	},
	balanceAddGems: (
		state: BalanceState,
		payload: BalanceAddGems,
		metadata: BroadcastMetadata & PlayerMetadata,
	): BalanceState => {
		const { add } = payload;
		const { user } = metadata;
		return Immut.produce(state, (draft: BalanceState): void => {
			const player = draft[user];
			if (player === undefined) {
				return;
			}
			const { data } = player;
			data.gems += add;
		});
	},
	balanceRemoveCoins: (
		state: BalanceState,
		payload: BalanceRemoveCoins,
		metadata: BroadcastMetadata & PlayerMetadata,
	): BalanceState => {
		const { remove } = payload;
		const { user } = metadata;
		return Immut.produce(state, (draft: BalanceState): void => {
			const player = draft[user];
			if (player === undefined) {
				return;
			}
			const { data } = player;
			data.coins -= remove;
		});
	},
	balanceRemoveGems: (
		state: BalanceState,
		payload: BalanceRemoveGems,
		metadata: BroadcastMetadata & PlayerMetadata,
	): BalanceState => {
		const { remove } = payload;
		const { user } = metadata;
		return Immut.produce(state, (draft: BalanceState): void => {
			const player = draft[user];
			if (player === undefined) {
				return;
			}
			const { data } = player;
			data.gems -= remove;
		});
	},
});
