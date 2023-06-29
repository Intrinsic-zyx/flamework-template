import { BalanceState } from "../slices";
import { ClientState } from "../producer";

export function balanceSelector(state: ClientState): BalanceState {
	return state.balance;
}
