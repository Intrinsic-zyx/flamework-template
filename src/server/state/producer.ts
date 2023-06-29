import { BroadcastAction, InferActions, InferState, combineProducers, createBroadcaster } from "@rbxts/reflex";
import { Events, Functions } from "server/network";
import { SharedProducers, sharedProducers } from "shared/state/slices";
import { balanceSlice } from "./slices";
import { createActionsFilter } from "./utils";
import { datastoreMiddleware } from "./middleware";
import { playerSelector } from "./selectors";

export type ServerProducers = typeof serverProducers;
export type ServerPlayerState = {
	[K in keyof ServerState]: ServerState[K] extends { players: { [index: number]: infer T } } ? T : ServerState[K];
};

export type ServerProducer = typeof serverProducer;
export type ServerState = InferState<ServerProducer>;
export type ServerActions = InferActions<ServerProducer>;

const serverProducers = {
	balance: balanceSlice,
};
const allProducers: SharedProducers & ServerProducers = {
	...sharedProducers,
	...serverProducers,
};

// It's best if you don't touch any of the following code unless you know for certain
// what you're doing...
const filteredActions = new Array<{ readonly [name: string]: Callback }>();
for (const [_, producer] of pairs(serverProducers)) {
	const actions = producer.getActions();
	filteredActions.push(actions);
}
const actionsFilter = createActionsFilter(...filteredActions);
const broadcaster = createBroadcaster({
	producers: allProducers,
	broadcast: (players: Array<Player>, actions: Array<BroadcastAction>): void => {
		// Filter out actions where `exclusive` is enabled
		for (const player of players) {
			const filtered = actionsFilter(player, actions);
			Events.replicateActions(player, filtered);
		}
	},
});
Functions.requestState.setCallback((player: Player): ServerPlayerState => {
	// Filter out private & hidden server state; other players' state, etc...
	const state = broadcaster.playerRequestedState(player);
	const selected = playerSelector(state, player);
	return selected;
});

export const serverProducer = combineProducers<ServerProducers & SharedProducers>(allProducers).applyMiddleware(
	broadcaster.middleware,
	datastoreMiddleware,
);
