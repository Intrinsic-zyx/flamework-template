import { BalancePlayerState } from "server/state/slices";
import { ServerPlayerState } from "server/state/producer";
import { balanceSelector } from "./balance-selector";
import { createSelector } from "@rbxts/reflex";

export const playersSelector = createSelector(
	[balanceSelector] as const,
	(balance: BalancePlayerState): ServerPlayerState => {
		return {
			balance,
		};
	},
);

export { balanceSelector };
