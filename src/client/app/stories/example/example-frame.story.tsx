import { ExampleFrame } from "client/app/components";
import { createStory } from "..";
import Roact from "@rbxts/roact";
import type { Element } from "@rbxts/roact";
import type { ExampleFrameProps } from "client/app/components";
import type { StoryConfig } from "..";

const exampleFrameStory: StoryConfig<ExampleFrameProps> = {
	name: "Example Story",
	summary: "A simple example story.",
	controls: {
		text: "Hello world!",
	},
	story: ({ controls }: { controls: ExampleFrameProps }): Element => {
		const { text } = controls;
		return <ExampleFrame text={text} />;
	},
};

export = createStory(exampleFrameStory);
