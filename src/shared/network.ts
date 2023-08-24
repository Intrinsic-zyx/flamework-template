import { Networking } from "@flamework/networking";
import type { BroadcastAction } from "@rbxts/reflex";

// Client -> Server
interface ServerEvents {
	replicateReceivedState(): void;
	replicateStartReceiving(): void;
}

// Server -> Client
interface ClientEvents {
	replicateActions(actions: Array<BroadcastAction>): void;
}

// Client -> Server -> Client
interface ServerFunctions {}

// Server -> Client -> Server
interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
