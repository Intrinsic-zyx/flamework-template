import { ExampleFrame, ExampleFrameProps } from "client/app/components";
import { StoryConfig, createStory } from "..";
import Roact, { Element } from "@rbxts/roact";

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
