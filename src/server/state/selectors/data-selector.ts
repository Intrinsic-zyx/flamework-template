import { DATA_TEMPLATE } from "shared/types/data";
import { Dictionary } from "@rbxts/sift";
import { balanceSelector } from "./players-selector";
import { createSelector } from "@rbxts/reflex";
import type { BalanceData, Data } from "shared/types/data";
import type { BalancePlayerState, ServerState } from "../producer";

const BALANCE_DATA: BalanceData = Dictionary.copyDeep(DATA_TEMPLATE.balance);

export function dataSelector(user: string): (state: ServerState) => Data {
	return createSelector([balanceSelector(user)], (balance?: BalancePlayerState): Data => {
		return {
			balance: balance?.data ?? BALANCE_DATA,
		};
	});
}
