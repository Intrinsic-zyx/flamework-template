import { createProducer } from "@rbxts/reflex";
import Immut from "@rbxts/immut";
import type { CounterActions, CounterAdd } from "../actions";

export interface CounterState {
	count: number;
}

const countState: CounterState = {
	count: 0,
};

export const countSlice = createProducer<CounterState, CounterActions<CounterState>>(countState, {
	countAdd: (state: CounterState, payload: CounterAdd): CounterState => {
		const { value } = payload;
		return Immut.produce(state, (draft: CounterState): void => {
			draft.count += value;
		});
	},
	countRemove: (state: CounterState, payload: CounterAdd): CounterState => {
		const { value } = payload;
		return Immut.produce(state, (draft: CounterState): void => {
			draft.count -= value;
		});
	},
});
