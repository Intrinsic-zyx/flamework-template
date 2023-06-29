import { BroadcastAction } from "@rbxts/reflex";
import { Networking } from "@flamework/networking";

// Client -> Server
interface ServerEvents {
	replicateReceivedState(): void;
}

// Server -> Client
interface ClientEvents {
	replicateActions(actions: Array<BroadcastAction>): void;
}

// Client -> Server -> Client
interface ServerFunctions {
	requestState(): defined;
}

// Server -> Client -> Server
interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
