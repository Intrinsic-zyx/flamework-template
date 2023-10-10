import { DATA_TEMPLATE } from "shared/types/data";
import { clear } from "@rbxts/immut/src/table";
import { createProducer } from "@rbxts/reflex";
import Immut from "@rbxts/immut";
import Sift from "@rbxts/sift";
import type {
	BalanceActions,
	BalanceAddCoins,
	BalanceAddGems,
	BalanceRemoveCoins,
	BalanceRemoveGems,
} from "../actions";
import type { BalanceData } from "shared/types/data";
import type { DataPlayerAdded, DataPlayerRemoving } from "shared/state/actions";

export type BalanceState = BalanceData;

const balanceState: BalanceState = Sift.Dictionary.copyDeep(DATA_TEMPLATE.balance);

export const balanceSlice = createProducer<BalanceState, BalanceActions<BalanceState>>(balanceState, {
	dataPlayerAdded: (state: BalanceState, payload: DataPlayerAdded): BalanceState => {
		const { data } = payload;
		const { balance } = data;
		return Immut.produce(state, (draft: Writable<BalanceState>): void => {
			draft = balance;
		});
	},
	dataPlayerRemoving: (state: BalanceState, payload: DataPlayerRemoving): BalanceState => {
		return Immut.produce(state, (draft: Writable<BalanceState>): void => {
			clear(draft);
		});
	},
	balanceAddCoins: (state: BalanceState, payload: BalanceAddCoins): BalanceState => {
		const { add } = payload;
		return Immut.produce(state, (draft: Writable<BalanceState>): void => {
			draft.coins += add;
		});
	},
	balanceAddGems: (state: BalanceState, payload: BalanceAddGems): BalanceState => {
		const { add } = payload;
		return Immut.produce(state, (draft: Writable<BalanceState>): void => {
			draft.gems += add;
		});
	},
	balanceRemoveCoins: (state: BalanceState, payload: BalanceRemoveCoins): BalanceState => {
		const { remove } = payload;
		return Immut.produce(state, (draft: Writable<BalanceState>): void => {
			draft.coins -= remove;
		});
	},
	balanceRemoveGems: (state: BalanceState, payload: BalanceRemoveGems): BalanceState => {
		const { remove } = payload;
		return Immut.produce(state, (draft: Writable<BalanceState>): void => {
			draft.gems -= remove;
		});
	},
});
