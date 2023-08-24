import { ReflexProvider } from "@rbxts/roact-reflex";
import { clientProducer } from "client/state/producer";
import { markPureComponent } from "@rbxts/roact-hooked";
import Roact from "@rbxts/roact";
import type { Element } from "@rbxts/roact";

export function App(): Element {
	return (
		<screengui IgnoreGuiInset={true} ResetOnSpawn={false} Key={"app"}>
			<ReflexProvider producer={clientProducer}>
				{/* Apps go here */}
				{/* and here! */}
			</ReflexProvider>
		</screengui>
	);
}
markPureComponent(App);
