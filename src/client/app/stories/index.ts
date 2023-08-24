import { withHookDetection } from "@rbxts/roact-hooked";
import Roact from "@rbxts/roact";
import type { Element } from "@rbxts/roact";

type Stringify<T> = { [K in keyof T]: T[K] extends number ? string : T[K] };

export interface StoryConfig<T = undefined> {
	name?: string;
	summary?: string;
	controls?: Partial<T>;
	story: (props: { controls: Stringify<T> }) => Element;
}

// We return `never` to prevent any of the stories from showing up in intellisense
// thereby clogging up out autocomplete with story related things.
export function createStory<T = undefined>(story: StoryConfig<T>): never {
	withHookDetection(Roact);
	return story as never;
}
