import { BroadcastAction, InferState, combineProducers, createBroadcastReceiver } from "@rbxts/reflex";
import { Events, Functions } from "client/network";
import { RunService } from "@rbxts/services";
import { SharedProducers, sharedProducers } from "shared/state/slices";
import { balanceSlice } from "./slices";

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
	requestState: async (): Promise<ClientState> => {
		// Ensure that the game is running to prevent strange errors in the console.
		assert(isRunning, "Cannot request state while the game is not running!");
		const state = Functions.requestState();
		Events.replicateReceivedState();
		return state as Promise<ClientState>;
	},
});
// Same applies, ensure the game is running to avoid errors.
isRunning &&
	Events.replicateActions.connect((actions: Array<BroadcastAction>): void => {
		clientReceiver.dispatch(actions);
	});

export const clientProducer = combineProducers<ClientProducers & SharedProducers>(allProducers).applyMiddleware(
	clientReceiver.middleware,
);
