interface Workspace {
	characters: Folder & {
		players: Folder;
		entities: Folder;
	};
}
