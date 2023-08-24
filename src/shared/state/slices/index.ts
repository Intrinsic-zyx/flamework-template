import { countSlice } from "./counter-slice";
import type { CombineStates } from "@rbxts/reflex";
import type { CounterState } from "./counter-slice";

export type SharedProducers = typeof sharedProducers;
export type SharedState = CombineStates<SharedProducers>;

export const sharedProducers = {
	count: countSlice,
};

export type { CounterState };
