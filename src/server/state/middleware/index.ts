import { ProducerMiddleware } from "@rbxts/reflex";
import { ServerActions, ServerState } from "../producer";
import { datastoreMiddleware as datastore } from "./datastore-middleware";

export const datastoreMiddleware = datastore as ProducerMiddleware<ServerState, ServerActions>;
