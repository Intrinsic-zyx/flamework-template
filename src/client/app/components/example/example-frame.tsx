import { markPureComponent } from "@rbxts/roact-hooked";
import Roact from "@rbxts/roact";
import type { Element } from "@rbxts/roact";

export interface ExampleFrameProps {
	text: string;
}

export function ExampleFrame({ text }: ExampleFrameProps): Element {
	return (
		<frame
			Size={UDim2.fromScale(0.25, 0.25)}
			AnchorPoint={Vector2.one.mul(0.5)}
			Position={UDim2.fromScale(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(35, 35, 35)}
			BackgroundTransparency={0.75}
			BorderSizePixel={0}
			Key={"example-frame"}
		>
			<textlabel
				Size={UDim2.fromScale(1, 1)}
				AnchorPoint={Vector2.one.mul(0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				BackgroundTransparency={1}
				Text={text}
				TextSize={20}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextWrapped={true}
				Font={Enum.Font.GothamMedium}
				Key={"example-text"}
			/>
			<uicorner CornerRadius={new UDim(0, 3)} Key={"example-corner"} />
			<uistroke
				ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
				Color={Color3.fromRGB(255, 255, 255)}
				Thickness={1}
				Transparency={0.5}
				Key={"example-stroke"}
			/>
		</frame>
	);
}
markPureComponent(ExampleFrame);
