import { datastoreMiddleware as datastore } from "./datastore-middleware";
import type { ProducerMiddleware } from "@rbxts/reflex";
import type { ServerActions, ServerState } from "../producer";

export const datastoreMiddleware = datastore as ProducerMiddleware<ServerState, ServerActions>;
