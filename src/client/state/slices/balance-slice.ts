import {
	BalanceActions,
	BalanceAddCoins,
	BalanceAddGems,
	BalanceRemoveCoins,
	BalanceRemoveGems,
	LoadPlayerData,
} from "../actions";
import { BalanceData, DATA_TEMPLATE } from "shared/types/data";
import { createProducer } from "@rbxts/reflex";
import Immut from "@rbxts/immut";
import Sift from "@rbxts/sift";

export interface BalanceState {
	readonly data: BalanceData;
}

const balanceState: BalanceState = {
	data: Sift.Dictionary.copyDeep(DATA_TEMPLATE.balance),
};

export const balanceSlice = createProducer<BalanceState, BalanceActions<BalanceState>>(balanceState, {
	loadPlayerData: (state: BalanceState, payload: LoadPlayerData): BalanceState => {
		const { data } = payload;
		const { balance } = data;
		return Immut.produce(state, (draft: Writable<BalanceState>): void => {
			draft.data = balance;
		});
	},
	balanceAddCoins: (state: BalanceState, payload: BalanceAddCoins): BalanceState => {
		const { add } = payload;
		return Immut.produce(state, (draft: Writable<BalanceState>): void => {
			const { data } = draft;
			data.coins += add;
		});
	},
	balanceAddGems: (state: BalanceState, payload: BalanceAddGems): BalanceState => {
		const { add } = payload;
		return Immut.produce(state, (draft: Writable<BalanceState>): void => {
			const { data } = draft;
			data.gems += add;
		});
	},
	balanceRemoveCoins: (state: BalanceState, payload: BalanceRemoveCoins): BalanceState => {
		const { remove } = payload;
		return Immut.produce(state, (draft: Writable<BalanceState>): void => {
			const { data } = draft;
			data.coins -= remove;
		});
	},
	balanceRemoveGems: (state: BalanceState, payload: BalanceRemoveGems): BalanceState => {
		const { remove } = payload;
		return Immut.produce(state, (draft: Writable<BalanceState>): void => {
			const { data } = draft;
			data.gems -= remove;
		});
	},
});
