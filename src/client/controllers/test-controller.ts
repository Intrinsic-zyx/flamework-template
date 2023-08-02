import { ClientState, clientProducer } from "client/state/producer";
import { Controller, OnStart } from "@flamework/core";

@Controller({})
export class TestController implements OnStart {
	public onStart(): void {
		clientProducer.subscribe((state: ClientState, prev: ClientState): void => {
			warn("State", state, "Prev", prev);
		});
	}
}
