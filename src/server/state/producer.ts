import { BalancePlayerState, BalanceState, PlayersState, playersSlice } from "./slices";
import {
	BroadcastAction,
	InferActions,
	InferState,
	combineProducers,
	createBroadcaster,
	loggerMiddleware,
} from "@rbxts/reflex";
import { Events } from "server/network";
import { SharedProducers, sharedProducers } from "shared/state/slices";
import { createFilter, filterActions } from "./utils";
import { datastoreMiddleware } from "./middleware";
import { playersSelector } from "./selectors";

export type ServerProducers = typeof serverProducers;
export type ServerPlayerState = {
	[K in keyof PlayersState]: PlayersState[K] extends { [user: string]: infer T } ? T : never;
};

export type ServerProducer = typeof serverProducer;
export type ServerState = InferState<ServerProducer>;
export type ServerActions = InferActions<ServerProducer>;

const serverProducers = {
	players: playersSlice,
};
const allProducers: SharedProducers & ServerProducers = {
	...sharedProducers,
	...serverProducers,
};

const filtered = filterActions(serverProducers);
const filter = createFilter(filtered);
const broadcaster = createBroadcaster({
	producers: allProducers,
	beforeDispatch: (player: Player, action: BroadcastAction): BroadcastAction | undefined => {
		const allowed = filter(player, action);
		return allowed ? action : undefined;
	},
	beforeHydrate: (player: Player, state: ServerState): Partial<ServerState> => {
		const user = player.UserId;
		const selected = playersSelector(state, user);
		const hydration = {
			...state,
			...selected,
			players: undefined,
		};
		return hydration as never;
	},
	dispatch: (player: Player, actions: Array<BroadcastAction>): void => {
		Events.replicateActions(player, actions);
	},
});
Events.replicateStartReceiving.connect((player: Player): void => {
	broadcaster.start(player);
});

export const serverProducer = combineProducers<ServerProducers & SharedProducers>(allProducers).applyMiddleware(
	broadcaster.middleware,
	datastoreMiddleware,
	loggerMiddleware,
);

export type { BalancePlayerState, BalanceState, PlayersState };
