import { App } from "client/app/apps";
import { Controller } from "@flamework/core";
import { Players } from "@rbxts/services";
import { withHookDetection } from "@rbxts/roact-hooked";
import Roact, { createElement, mount } from "@rbxts/roact";
import type { OnStart } from "@flamework/core";

const player = Players.LocalPlayer;
const playerGui = player.FindFirstChildOfClass("PlayerGui");

@Controller({})
export class AppController implements OnStart {
	public onStart(): void {
		withHookDetection(Roact);
		const app = createElement(App);
		mount(app, playerGui);
	}
}
