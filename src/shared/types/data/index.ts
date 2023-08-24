import { Flamework } from "@flamework/core";
import type { BalanceData } from "./balance-data";

export interface Data {
	balance: BalanceData;
}

export const DATA_TEMPLATE: Data = {
	balance: {
		coins: 0,
		gems: 0,
	},
};

export const isData = Flamework.createGuard<Data>();

export type { BalanceData };
