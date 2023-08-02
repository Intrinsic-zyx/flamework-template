import { BalancePlayerState, BalanceState, ServerState } from "server/state/producer";

export function balanceSelector(state: ServerState): BalanceState;
export function balanceSelector(state: ServerState, user: number): BalancePlayerState;

export function balanceSelector(state: ServerState, user?: number): BalanceState | BalancePlayerState {
	const balanceState = state.players.balance;
	if (user === undefined) {
		return balanceState;
	}
	const playerState = balanceState[`${user}`];
	return playerState;
}
