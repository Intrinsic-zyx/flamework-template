import { CounterState, SharedState } from "../slices";

export function counterSelector(state: SharedState): CounterState {
	return state.count;
}
