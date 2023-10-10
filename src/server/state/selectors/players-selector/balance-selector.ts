import type { BalancePlayerState, BalanceState, ServerState } from "server/state/producer";

export function balanceSelector(): (state: ServerState) => BalanceState;
export function balanceSelector(user: string): (state: ServerState) => BalancePlayerState | undefined;

export function balanceSelector(user?: string): (state: ServerState) => BalanceState | BalancePlayerState | undefined {
	return function (state: ServerState): BalanceState | BalancePlayerState | undefined {
		const { players } = state;
		const { balance } = players;
		if (user === undefined) {
			return balance;
		}
		return balance[user];
	};
}
