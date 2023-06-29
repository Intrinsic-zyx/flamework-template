import { DATA_PLAYER_INDEX, DATA_STORE_NAME } from "server/constants/data-constants";
import { DATA_TEMPLATE, Data, isData } from "shared/types/data";
import { Document, createCollection } from "@rbxts/lapis";
import { Flamework, Service } from "@flamework/core";
import { OnPlayerAdded, OnPlayerRemoving } from "./player-service";
import { createListener } from "shared/functions/create-listener";
import { serverProducer } from "server/state/producer";

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

const onLoadedListener = createListener<OnDataLoaded>("onDataLoaded", Flamework.id<OnDataLoaded>());
const onClosingListener = createListener<OnDataClosing>("onDataClosing", Flamework.id<OnDataClosing>());

const collection = createCollection(DATA_STORE_NAME, { defaultData: DATA_TEMPLATE, validate: isData });

@Service({})
export class DataService implements OnPlayerAdded, OnPlayerRemoving {
	public readonly documents = new Map<Player, Document<Data>>();

	public onDataLoaded(player: Player, document: Document<Data>): void {
		const data = document.read();
		serverProducer.loadPlayerData({ data }, { player, exclusive: true });
		onLoadedListener(player, document);
	}
	public onDataClosing(player: Player, document: Document<Data>): void {
		serverProducer.closePlayerData(undefined, { player });
		onClosingListener(player, document);
	}

	public async onPlayerAdded(player: Player): Promise<void> {
		const { documents } = this;
		const document = await collection.load(`${DATA_PLAYER_INDEX}${player.UserId}`);
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
