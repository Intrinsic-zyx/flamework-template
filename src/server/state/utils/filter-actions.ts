import { BroadcastAction } from "@rbxts/reflex";
import { BroadcastMetadata, PlayerMetadata, isBroadcastMetadata, isPlayerMetadata } from "shared/state/metadata";
import { ServerProducers } from "../producer";

function findUserId(args: Array<unknown>): (PlayerMetadata & BroadcastMetadata) | undefined {
	for (const argument of args) {
		if (!isPlayerMetadata(argument) || !isBroadcastMetadata(argument)) {
			continue;
		}
		return argument;
	}
	return undefined;
}

export function filterActions(producers: ServerProducers): Set<string> {
	const filtered = new Set<string>();
	// eslint-disable-next-line roblox-ts/no-array-pairs
	for (const [_, producer] of pairs(producers)) {
		const actions: Record<string, Callback> = producer.getActions();
		// eslint-disable-next-line roblox-ts/no-array-pairs
		for (const [name] of pairs(actions)) {
			filtered.add(name);
		}
	}
	return filtered;
}

export function createFilter(filtered: Set<string>): (player: Player, actions: BroadcastAction) => boolean {
	return (player: Player, action: BroadcastAction): boolean => {
		if (!filtered.has(action.name)) {
			return true;
		}
		const metadata = findUserId(action.arguments);
		if (metadata === undefined || metadata.exclusive === undefined || !metadata.exclusive) {
			return true;
		}
		if (metadata.replicate !== undefined && !metadata.replicate) {
			return false;
		}
		return metadata.user === player.UserId;
	};
}
