import { DATA_PLAYER_INDEX, DATA_STORE_NAME } from "server/constants/data-constants";
import { DATA_TEMPLATE, isData } from "shared/types/data";
import { Service } from "@flamework/core";
import { createCollection } from "@rbxts/lapis";
import { createListener } from "shared/functions/create-listener";
import { serverProducer } from "server/state/producer";
import type { Data } from "shared/types/data";
import type { Document } from "@rbxts/lapis";
import type { OnPlayerAdded, OnPlayerRemoving } from "./player-service";

export interface OnDataLoaded {
	/**
	 * @hideinherited
	 */
	onDataLoaded(player: Player, document: Document<Data>): void;
}

export interface OnDataClosing {
	/**
	 * @hideinherited
	 */
	onDataClosing(player: Player, document: Document<Data>): void;
}

const onLoadedListener = createListener<OnDataLoaded>();
const onClosingListener = createListener<OnDataClosing>();

const collection = createCollection(DATA_STORE_NAME, { defaultData: DATA_TEMPLATE, validate: isData });

@Service({})
export class DataService implements OnPlayerAdded, OnPlayerRemoving {
	public readonly documents = new Map<Player, Document<Data>>();

	public onDataLoaded(player: Player, document: Document<Data>): void {
		const data = document.read();
		const user = player.UserId;
		serverProducer.loadPlayerData({ data }, { user, exclusive: true });
		onLoadedListener(player, document);
	}
	public onDataClosing(player: Player, document: Document<Data>): void {
		const user = player.UserId;
		serverProducer.closePlayerData(undefined, { user });
		onClosingListener(player, document);
	}

	public async onPlayerAdded(player: Player): Promise<void> {
		const { documents } = this;
		// let document: Document<Data>;
		// try {
		// await collection.load(`${DATA_PLAYER_INDEX}${player.UserId}`)
		const document = await collection
			.load(`${DATA_PLAYER_INDEX}${player.UserId}`)
			.catch((reason: unknown): void => player.Kick(tostring(reason)));
		if (document === undefined) {
			return;
		}
		// } catch (error) {
		// player.Kick(tostring(error));
		// return;
		// }
		this.onDataLoaded(player, document);
		documents.set(player, document);
	}

	public async onPlayerRemoving(player: Player): Promise<void> {
		const { documents } = this;
		const document = documents.get(player);
		if (document === undefined) {
			return;
		}
		documents.delete(player);
		const promises = onClosingListener(player, document);
		await Promise.all(promises);
		await document.close().catch(warn);
	}
}
