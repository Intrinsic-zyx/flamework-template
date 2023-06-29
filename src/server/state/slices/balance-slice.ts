import {
	BalanceActions,
	BalanceAddCoins,
	BalanceAddGems,
	BalanceRemoveCoins,
	BalanceRemoveGems,
	LoadPlayerData,
} from "../actions";
import { BalanceData } from "shared/types/data";
import { BroadcastMetadata, PlayerMetadata } from "shared/state/metadata";
import { createProducer } from "@rbxts/reflex";
import Immut from "@rbxts/immut";

export interface BalancePlayerState {
	readonly data: BalanceData;
}

export interface BalanceState {
	readonly players: {
		[index: number]: BalancePlayerState;
	};
}

const balanceState: BalanceState = {
	players: {},
};

export const balanceSlice = createProducer<BalanceState, BalanceActions<BalanceState>>(balanceState, {
	loadPlayerData: (
		state: BalanceState,
		payload: LoadPlayerData,
		metadata: BroadcastMetadata & PlayerMetadata,
	): BalanceState => {
		const { data } = payload;
		const { balance } = data;
		const { player } = metadata;
		return Immut.produce(state, (draft: BalanceState): void => {
			const { players } = draft;
			players[player.UserId] = { data: balance };
		});
	},
	closePlayerData: (state: BalanceState, payload: undefined, metadata: PlayerMetadata): BalanceState => {
		const { player } = metadata;
		return Immut.produce(state, (draft: BalanceState): void => {
			const { players } = draft;
			delete players[player.UserId];
		});
	},
	balanceAddCoins: (
		state: BalanceState,
		payload: BalanceAddCoins,
		metadata: BroadcastMetadata & PlayerMetadata,
	): BalanceState => {
		const { add } = payload;
		const { player } = metadata;
		return Immut.produce(state, (draft: BalanceState): void => {
			const { players } = draft;
			const playerState = players[player.UserId];
			if (playerState === undefined) {
				return;
			}
			const { data } = playerState;
			data.coins += add;
		});
	},
	balanceAddGems: (
		state: BalanceState,
		payload: BalanceAddGems,
		metadata: BroadcastMetadata & PlayerMetadata,
	): BalanceState => {
		const { add } = payload;
		const { player } = metadata;
		return Immut.produce(state, (draft: BalanceState): void => {
			const { players } = draft;
			const playerState = players[player.UserId];
			if (playerState === undefined) {
				return;
			}
			const { data } = playerState;
			data.gems += add;
		});
	},
	balanceRemoveCoins: (
		state: BalanceState,
		payload: BalanceRemoveCoins,
		metadata: BroadcastMetadata & PlayerMetadata,
	): BalanceState => {
		const { remove } = payload;
		const { player } = metadata;
		return Immut.produce(state, (draft: BalanceState): void => {
			const { players } = draft;
			const playerState = players[player.UserId];
			if (playerState === undefined) {
				return;
			}
			const { data } = playerState;
			data.coins -= remove;
		});
	},
	balanceRemoveGems: (
		state: BalanceState,
		payload: BalanceRemoveGems,
		metadata: BroadcastMetadata & PlayerMetadata,
	): BalanceState => {
		const { remove } = payload;
		const { player } = metadata;
		return Immut.produce(state, (draft: BalanceState): void => {
			const { players } = draft;
			const playerState = players[player.UserId];
			if (playerState === undefined) {
				return;
			}
			const { data } = playerState;
			data.gems -= remove;
		});
	},
});
