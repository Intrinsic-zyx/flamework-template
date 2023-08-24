import { Service } from "@flamework/core";
import { serverProducer } from "server/state/producer";
import type { Character } from "shared/types/objects";
import type { OnCharacterAdded, OnCharacterRemoving } from "./character-service";

@Service({})
export class TestService implements OnCharacterAdded, OnCharacterRemoving {
	public onCharacterAdded(character: Character, player: Player): void {
		serverProducer.balanceAddCoins({ add: 1000 }, { user: player.UserId, exclusive: true });
	}

	public onCharacterRemoving(character: Model, player: Player): void {
		serverProducer.balanceAddGems({ add: 100 }, { user: player.UserId, exclusive: true });
		serverProducer.countAdd({ value: 10 });
	}
}
