import { OnDataLoaded } from "./data-service";
import { Service } from "@flamework/core";

@Service({})
export class SpawnService implements OnDataLoaded {
	public onDataLoaded(player: Player): void {
		player.LoadCharacter();
	}
}
