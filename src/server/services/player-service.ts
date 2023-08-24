import { Players } from "@rbxts/services";
import { Service } from "@flamework/core";
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

@Service({})
export class PlayerService implements OnStart {
	private readonly playersResolving = new Map<Player, Promise<unknown>>();

	public onPlayerAdded(player: Player): void {
		onAddedListener(player);
	}

	public onPlayerRemoving(player: Player): Promise<unknown> {
		const promises = onRemovingListener(player);
		const resolving = this.playersResolving;
		// Cache promises incase the game closes as a player is leaving, we want to ensure
		// this listener completes before closing the game.
		const promise = Promise.all(promises).finally((): void => {
			resolving.delete(player);
		});
		resolving.set(player, promise);
		return promise;
	}

	public onGameClosing(): void {
		const resolving = this.playersResolving;
		const players = Players.GetPlayers();
		const filtered = players.filter((value: Player): boolean => !resolving.has(value));
		const promises = new Array<Promise<unknown>>();
		// Go through all the currently cached promises.
		for (const [_, promise] of resolving) {
			promises.push(promise);
		}
		// We filtered out all the players who already had promises resolving, now we have to run it for
		// any who don't, this is usually none but we must ensure.
		for (const player of filtered) {
			const promise = this.onPlayerRemoving(player);
			promises.push(promise);
		}
		// Now we have to yield the current thread and delay the game from closing until all promises
		// have been resolved.
		Promise.all(promises).await();
	}

	public onStart(): void {
		Players.PlayerAdded.Connect((player: Player): void => this.onPlayerAdded(player));
		Players.PlayerRemoving.Connect((player: Player): Promise<unknown> => this.onPlayerRemoving(player));
		game.BindToClose((): void => this.onGameClosing());
		// We have to get any players who've joined before it ran.
		const players = Players.GetPlayers();
		for (const player of players) {
			task.defer((): void => this.onPlayerAdded(player));
		}
	}
}
