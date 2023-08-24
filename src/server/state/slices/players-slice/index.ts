import { BalancePlayerState, BalanceState, balanceSlice } from "./balance-slice";
import { combineProducers } from "@rbxts/reflex";
import type { InferState } from "@rbxts/reflex";

type PlayersSlice = typeof playersSlice;
export type PlayersState = InferState<PlayersSlice>;

export const playersSlice = combineProducers({
	balance: balanceSlice,
});

export { BalancePlayerState, BalanceState, balanceSlice };
