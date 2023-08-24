import type { BalanceState } from "../slices";
import type { ClientState } from "../producer";

export function balanceSelector(state: ClientState): BalanceState {
	return state.balance;
}
