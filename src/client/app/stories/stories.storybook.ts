import { withHookDetection } from "@rbxts/roact-hooked";
import Roact from "@rbxts/roact";

export = {
	roact: withHookDetection(Roact),
	storyRoots: [script.Parent],
} as never;
