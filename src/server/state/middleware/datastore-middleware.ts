import { Dependency, Flamework } from "@flamework/core";
import { Players } from "@rbxts/services";
import { isPlayerMetadata } from "shared/state/metadata";
import { playersSelector } from "../selectors";
import type { Data } from "shared/types/data";
import type { DataService } from "server/services/data-service";
import type { ServerProducer, ServerState } from "../producer";

export const isKeyofData = Flamework.createGuard<keyof Data>();

export const datastoreMiddleware =
	(producer: ServerProducer) =>
	(dispatch: (payload: unknown, metadata: unknown) => ServerState, name: string) =>
	(payload: unknown, metadata: unknown): ServerState => {
		const dataService = Dependency<DataService>();
		const newState = dispatch(payload, metadata);
		if (!isPlayerMetadata(metadata)) {
			return newState;
		}
		const { user } = metadata;
		const player = Players.GetPlayerByUserId(user);
		if (player === undefined) {
			return newState;
		}
		const cachedDocument = dataService.documents.get(player);
		const playerData = cachedDocument?.read();
		const playerState = playersSelector(newState, user);
		const dataToWrite: Partial<Data> = {};
		if (cachedDocument === undefined || playerData === undefined) {
			return newState;
		}
		for (const [key, state] of pairs(playerState)) {
			if (!(key in playerData) || !isKeyofData(key)) {
				continue;
			}
			dataToWrite[key] = state;
		}
		cachedDocument.write(dataToWrite as Data);
		return newState;
	};
