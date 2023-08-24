import { Controller } from "@flamework/core";
import { clientProducer } from "client/state/producer";
import type { ClientState } from "client/state/producer";
import type { OnStart } from "@flamework/core";

@Controller({})
export class TestController implements OnStart {
	public onStart(): void {
		clientProducer.subscribe((state: ClientState, prev: ClientState): void => {
			warn("State", state, "Prev", prev);
		});
	}
}
