import { Events } from "client/network";
import { RunService } from "@rbxts/services";
import { balanceSlice } from "./slices";
import { combineProducers, createBroadcastReceiver, loggerMiddleware } from "@rbxts/reflex";
import { sharedProducers } from "shared/state/slices";
import type { BalanceState } from "./slices";
import type { BroadcastAction, InferState } from "@rbxts/reflex";
import type { SharedProducers } from "shared/state/slices";

const isRunning = RunService.IsRunning();

export type ClientProducers = typeof clientProducers;

export type ClientProducer = typeof clientProducer;
export type ClientState = InferState<ClientProducer>;

const clientProducers = {
	balance: balanceSlice,
};
const allProducers: SharedProducers & ClientProducers = {
	...sharedProducers,
	...clientProducers,
};

const clientReceiver = createBroadcastReceiver({
	start: (): void => {
		// Ensure that the game is running to prevent strange errors in the console.
		assert(isRunning, "Cannot start replication while the game is not running!");
		Events.replicateStartReceiving();
	},
});
// Same applies, ensure the game is running to avoid errors.
isRunning &&
	Events.replicateActions.connect((actions: Array<BroadcastAction>): void => {
		clientReceiver.dispatch(actions);
	});

export const clientProducer = combineProducers<ClientProducers & SharedProducers>(allProducers).applyMiddleware(
	...(isRunning ? [clientReceiver.middleware, loggerMiddleware] : ([undefined] as never)),
);
export type { BalanceState };
