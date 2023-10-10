import { DATA_TEMPLATE } from "shared/types/data";
import { Dictionary } from "@rbxts/sift";
import { balanceSelector } from "./balance-selector";
import { createSelector } from "@rbxts/reflex";
import type { BalancePlayerState } from "server/state/slices";
import type { ServerPlayerState, ServerState } from "server/state/producer";

const BALANCE_STATE: BalancePlayerState = {
	data: Dictionary.copyDeep(DATA_TEMPLATE.balance),
};

export function playersSelector(user: string): (state: ServerState) => ServerPlayerState {
	return createSelector([balanceSelector(user)], (balance?: BalancePlayerState): ServerPlayerState => {
		return {
			balance: balance ?? BALANCE_STATE,
		};
	});
}

export { balanceSelector };
