import { Modding } from "@flamework/core";
import type { Listener } from "shared/types/objects";

type ListenerArgs<T> = Parameters<T[keyof T]>;
type ListenerResult<T> = ReturnType<T[keyof T]> | void;
type ListenerReturn<T> = Array<Promise<ListenerResult<T>>>;

export function createListener<T>(index: keyof T, id: string, method = true): Listener<T> {
	const listenerConnections = new Array<RBXScriptConnection>();
	const listenersActive = new Set<T>();
	// We have to listen to whenever a listener of `id` gets added, whenever it does
	// cache it in a `Set` and then call it later once we fire the listener.
	listenerConnections.push(
		Modding.onListenerAdded<T>((object: T): Set<T> => listenersActive.add(object), id),
		Modding.onListenerRemoved<T>((object: T): boolean => listenersActive.delete(object), id),
	);
	const listenerImpl = {
		fire: (...args: ListenerArgs<T>): ListenerReturn<T> => {
			const promisesResolving = new Array<Promise<ListenerResult<T>>>();
			for (const listener of listenersActive) {
				const listenerFunction = listener[index];
				// This is just to tell typescript that we can call the function
				// without it'd scream at us, this will always be true.
				if (!typeIs(listenerFunction, "function")) {
					continue;
				}
				// If it's a method, we have to pass in `self`, we do this via `(listener, ...args)`
				// otherwise don't pass in `self`.
				const listenerPromise = Promise.try<ListenerResult<T>>(
					(): ListenerResult<T> => (method ? listenerFunction(listener, ...args) : listenerFunction(...args)),
				);
				promisesResolving.push(listenerPromise);
			}
			return promisesResolving;
		},
		connected: (): Set<T> => {
			return listenersActive;
		},
	} as Listener<T>;
	// Set up the `__call` metamethod, roblox-ts doesn't support the `__call` metamethod so we
	// have to typecast. :(
	const listenerMetatable = {
		__call: (listener: Listener<T>, ...args: ListenerArgs<T>): ListenerReturn<T> => {
			return listener.fire(...args);
		},
	} as unknown as LuaMetatable<Listener<T>>;
	setmetatable(listenerImpl, listenerMetatable);
	return listenerImpl;
}
