import { Data } from "shared/types/data";
import { DataService } from "server/services/data-service";
import { Dependency, Flamework } from "@flamework/core";
import { ServerProducer, ServerState } from "../producer";
import { isPlayerMetadata } from "shared/state/metadata";
import { playerSelector } from "../selectors";

export const isKeyofData = Flamework.createGuard<keyof Data>();

export function datastoreMiddleware(
	producer: ServerProducer,
): (
	dispatch: (payload: unknown, metadata: unknown) => ServerState,
	name: string,
) => (payload: unknown, metadata: unknown) => ServerState {
	return function (dispatch, name): (payload: unknown, metadata: unknown) => ServerState {
		return function (payload: unknown, metadata: unknown): ServerState {
			const dataService = Dependency<DataService>();
			const newState = dispatch(payload, metadata);
			if (!isPlayerMetadata(metadata)) {
				return newState;
			}
			const { player } = metadata;
			const cachedDocument = dataService.documents.get(player);
			if (cachedDocument === undefined) {
				return newState;
			}
			const playerData = cachedDocument.read();
			const playerState = playerSelector(newState, player);
			const dataToWrite: Partial<Data> = {};
			for (const [key, state] of pairs(playerState)) {
				if (!(key in playerData) || !("data" in state) || !isKeyofData(key)) {
					continue;
				}
				const stateData = state.data;
				dataToWrite[key] = stateData;
			}
			warn(dataToWrite, playerData);
			cachedDocument.write(dataToWrite as Data);
			return newState;
		};
	};
}
