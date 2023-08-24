import { balanceSelector } from "./balance-selector";
import { createSelector } from "@rbxts/reflex";
import type { BalancePlayerState } from "server/state/slices";
import type { ServerPlayerState } from "server/state/producer";

export const playersSelector = createSelector(
	[balanceSelector] as const,
	(balance: BalancePlayerState): ServerPlayerState => {
		return {
			balance,
		};
	},
);

export { balanceSelector };
