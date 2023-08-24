import { Controller } from "@flamework/core";
import { Players } from "@rbxts/services";
import { createListener } from "shared/functions/create-listener";
import type { OnStart } from "@flamework/core";

export interface OnPlayerAdded {
	/**
	 * @hideinherited
	 */
	onPlayerAdded(player: Player): void;
}

export interface OnPlayerRemoving {
	/**
	 * @hideinherited
	 */
	onPlayerRemoving(player: Player): void;
}

const onAddedListener = createListener<OnPlayerAdded>();
const onRemovingListener = createListener<OnPlayerRemoving>();

@Controller({})
export class PlayerController implements OnStart {
	public onPlayerAdded(player: Player): void {
		onAddedListener(player);
	}

	public onPlayerRemoving(player: Player): void {
		onRemovingListener(player);
	}

	public onStart(): void {
		Players.PlayerAdded.Connect((player: Player): void => this.onPlayerAdded(player));
		Players.PlayerRemoving.Connect((player: Player): void => this.onPlayerRemoving(player));
		// We have to get any players who've joined before it ran.
		const players = Players.GetPlayers();
		for (const player of players) {
			task.defer((): void => this.onPlayerAdded(player));
		}
	}
}
