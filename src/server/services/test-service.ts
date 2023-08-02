import { Character } from "shared/types/instances";
import { OnCharacterAdded, OnCharacterRemoving } from "./character-service";
import { Service } from "@flamework/core";
import { serverProducer } from "server/state/producer";

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
