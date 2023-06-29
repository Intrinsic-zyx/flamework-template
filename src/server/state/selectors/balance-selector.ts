import { BalancePlayerState, BalanceState } from "../slices";
import { ServerState } from "../producer";

export function balanceSelector(state: ServerState): BalanceState;
export function balanceSelector(state: ServerState, player: Player): BalancePlayerState;

export function balanceSelector(state: ServerState, player?: Player): BalanceState | BalancePlayerState {
	const balanceState = state.balance;
	if (player === undefined) {
		return balanceState;
	}
	const { players } = balanceState;
	const playerState = players[player.UserId];
	return playerState;
}
