import { DATA_PLAYER_INDEX, DATA_STORE_NAME } from "server/constants/data-constants";
import { DATA_TEMPLATE, isData } from "shared/types/data";
import { Service } from "@flamework/core";
import { createCollection } from "@rbxts/lapis";
import { createListener } from "shared/functions/create-listener";
import { dataSelector } from "server/state/selectors";
import { serverProducer } from "server/state/producer";
import type { Data } from "shared/types/data";
import type { Document } from "@rbxts/lapis";
import type { OnPlayerAdded, OnPlayerRemoving } from "./player-service";

export interface OnDataLoaded {
	/**
	 * @hideinherited
	 */
	onDataLoaded(player: Player, data: Readonly<Data>): void;
}

export interface OnDataClosing {
	/**
	 * @hideinherited
	 */
	onDataClosing(player: Player, data: Readonly<Data>): void;
}

const onLoadedListener = createListener<OnDataLoaded>();
const onClosingListener = createListener<OnDataClosing>();

const collection = createCollection(DATA_STORE_NAME, {
	defaultData: DATA_TEMPLATE,
	validate: isData,
});

@Service({})
export class DataService implements OnPlayerAdded, OnPlayerRemoving {
	private readonly documents = new Map<Player, Document<Data>>();
	private readonly subscriptions = new Map<Player, () => void>();

	public onDataLoaded(player: Player, data: Readonly<Data>): void {
		const user = player.Name;
		serverProducer.dataPlayerAdded({ data }, { user, exclusive: true });
		onLoadedListener(player, data);
	}

	public onDataClosing(player: Player, data: Readonly<Data>): Array<Promise<void>> {
		const user = player.Name;
		serverProducer.dataPlayerRemoving(undefined, { user });
		return onClosingListener(player, data);
	}

	public async onPlayerAdded(player: Player): Promise<void> {
		const { documents, subscriptions } = this;
		try {
			const document = await collection.load(`${DATA_PLAYER_INDEX}${player.UserId}`);
			// Subscribe to data changes, write to document, no middleware.
			const data = document.read();
			this.onDataLoaded(player, data);
			const unsubscribe = serverProducer.subscribe(dataSelector(player.Name), (state: Data): void => {
				document.write(state);
			});
			documents.set(player, document);
			subscriptions.set(player, unsubscribe);
		} catch (error: unknown) {
			warn(`Failed to load data for ${player.Name}: ${error}`);
			this.onDataLoaded(player, DATA_TEMPLATE);
		}
	}

	public async onPlayerRemoving(player: Player): Promise<void> {
		const { documents, subscriptions } = this;
		const document = documents.get(player);
		const unsubscribe = subscriptions.get(player);
		if (unsubscribe !== undefined) {
			unsubscribe();
		}
		documents.delete(player);
		const data = document?.read() ?? DATA_TEMPLATE;
		const promises = this.onDataClosing(player, data);
		await Promise.all(promises);
		await document?.close().catch(warn);
	}
}
