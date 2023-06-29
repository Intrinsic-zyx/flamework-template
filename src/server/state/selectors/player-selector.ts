import { BalancePlayerState } from "../slices";
import { CounterState } from "shared/state/slices";
import { ServerPlayerState } from "../producer";
import { balanceSelector } from "./balance-selector";
import { counterSelector } from "shared/state/selectors";
import { createSelector } from "@rbxts/reflex";

export const playerSelector = createSelector(
	[balanceSelector, counterSelector] as const,
	(balance: BalancePlayerState, count: CounterState): ServerPlayerState => {
		return {
			count,
			balance,
		};
	},
);
