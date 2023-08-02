import { BroadcastMetadata } from "../metadata";

export type CounterActions<S> = {
	countAdd: (state: S, payload: CounterAdd, metadata?: BroadcastMetadata) => S;
	countRemove: (state: S, payload: CounterRemove, metadata?: BroadcastMetadata) => S;
};

export interface CounterAdd {
	value: number;
}

export interface CounterRemove {
	value: number;
}
