import { BroadcastAction } from "@rbxts/reflex";
import { BroadcastMetadata, PlayerMetadata, isBroadcastMetadata, isPlayerMetadata } from "shared/state/metadata";
import Sift from "@rbxts/sift";

function findUserId(args: Array<unknown>): (PlayerMetadata & BroadcastMetadata) | undefined {
	for (const argument of args) {
		if (!isPlayerMetadata(argument) || !isBroadcastMetadata(argument)) {
			continue;
		}
		return argument;
	}
	return undefined;
}

export function createActionsFilter(
	...actions: Array<{ readonly [name: string]: Callback }>
): (player: Player, actions: Array<BroadcastAction>) => Array<BroadcastAction> {
	const names = new Set<string>();
	for (const actionMap of actions) {
		for (const action of Sift.Dictionary.keys(actionMap)) {
			names.add(`${action}`);
		}
	}
	return (player: Player, actions: Array<BroadcastAction>): Array<BroadcastAction> => {
		return actions.filter((action: BroadcastAction): boolean => {
			if (!names.has(action.name)) {
				return true;
			}
			const metadata = findUserId(action.arguments);
			if (metadata === undefined || metadata.exclusive === undefined || !metadata.exclusive) {
				return true;
			}
			return metadata.player.UserId === player.UserId;
		});
	};
}
