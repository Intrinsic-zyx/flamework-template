import { CHARACTER_PROMISE_FUNCTION, CHARACTER_RESPAWN_DELAY } from "shared/constants/character-constants";
import { Character, isCharacter } from "shared/types/instances";
import { Flamework, OnStart, Service } from "@flamework/core";
import { OnPlayerAdded, OnPlayerRemoving } from "./player-service";
import { Players } from "@rbxts/services";
import { createListener } from "shared/functions/create-listener";

export interface OnCharacterAdded {
	/**
	 * @hideinherited
	 */
	onCharacterAdded(character: Character, player: Player): void;
}

export interface OnCharacterRemoving {
	/**
	 * @hideinherited
	 */
	onCharacterRemoving(character: Model, player: Player): void;
}

const onAddedListener = createListener<OnCharacterAdded>("onCharacterAdded", Flamework.id<OnCharacterAdded>());
const onRemovingListener = createListener<OnCharacterRemoving>(
	"onCharacterRemoving",
	Flamework.id<OnCharacterRemoving>(),
);

const charactersFolder = game.Workspace.characters;
const playerCharacters = charactersFolder.players;

@Service({})
export class CharacterService implements OnPlayerAdded, OnPlayerRemoving, OnStart {
	private readonly characterConnections = new Map<Player, Array<RBXScriptConnection>>();
	private readonly playerConnections = new Map<Player, Array<RBXScriptConnection>>();

	public async onCharacterAdded(model: Model, player: Player): Promise<void> {
		const { characterConnections } = this;
		const connections = new Array<RBXScriptConnection>();
		const character = await CHARACTER_PROMISE_FUNCTION(model);
		if (!isCharacter(character)) {
			return;
		}
		const humanoid = character.Humanoid;
		connections.push(
			character.AncestryChanged.Connect((child: Instance, parent?: Instance): void => {
				if (child === undefined || parent === undefined || parent === playerCharacters) {
					return;
				}
				// We have to defer to avoid errors.
				task.defer((): Folder => (character.Parent = playerCharacters));
			}),
			// Respawning, since we have `CharacterAutoLoads` disabled.
			humanoid.Died.Connect((): void => {
				task.delay(CHARACTER_RESPAWN_DELAY, (): void => player.LoadCharacter());
			}),
		);
		task.defer((): Folder => (character.Parent = playerCharacters));
		characterConnections.set(player, connections);
		onAddedListener(character, player);
	}

	public onCharacterRemoving(character: Model, player: Player): void {
		const { characterConnections } = this;
		const connections = characterConnections.get(player);
		if (connections !== undefined) {
			for (const connection of connections) {
				connection.Disconnect();
			}
			connections.clear();
		}
		characterConnections.delete(player);
		onRemovingListener(character, player);
	}

	public onPlayerAdded(player: Player): void {
		const { playerConnections } = this;
		const connections = new Array<RBXScriptConnection>();
		connections.push(
			player.CharacterAdded.Connect(
				(character: Model): Promise<void> => this.onCharacterAdded(character, player),
			),
			player.CharacterRemoving.Connect((character: Model): void => this.onCharacterRemoving(character, player)),
		);
		playerConnections.set(player, connections);
		const character = player.Character;
		if (character === undefined) {
			return;
		}
		this.onCharacterAdded(character, player);
	}

	public onPlayerRemoving(player: Player): void {
		const { playerConnections, characterConnections } = this;
		// Bad variable names :(
		const connectionsPlayer = playerConnections.get(player);
		const connectionsCharacter = characterConnections.get(player);
		if (connectionsPlayer !== undefined) {
			for (const connection of connectionsPlayer) {
				connection.Disconnect();
			}
			connectionsPlayer.clear();
		}
		if (connectionsCharacter !== undefined) {
			for (const connection of connectionsCharacter) {
				connection.Disconnect();
			}
			connectionsCharacter.clear();
		}
		playerConnections.delete(player);
		characterConnections.delete(player);
	}

	public onStart(): void {
		Players.CharacterAutoLoads = false;
	}
}
