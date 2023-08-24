import { Service } from "@flamework/core";
import type { OnDataLoaded } from "./data-service";

@Service({})
export class SpawnService implements OnDataLoaded {
	public onDataLoaded(player: Player): void {
		player.LoadCharacter();
	}
}
