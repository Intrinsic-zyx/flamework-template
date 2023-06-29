import { CombineStates } from "@rbxts/reflex";
import { CounterState, countSlice } from "./counter-slice";

export type SharedProducers = typeof sharedProducers;
export type SharedState = CombineStates<SharedProducers>;

export const sharedProducers = {
	count: countSlice,
};

export type { CounterState };
