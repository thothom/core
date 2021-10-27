interface InternalCreateDotSymbiosisDirParams {
	getRootPath: (path: string) => string;
	mkdirSync: (path: string, options: { recursive: true }) => void;
	existsSync: (path: string) => boolean;
	readFileSync: (path: string, encoding: "utf8") => string;
	writeFileSync: (path: string, data: string) => void;
	path: string;
}

export const gitIgnoreMessage =
	"# Do not touch it! Symb needs this exact exclude, or will generate it again.\n/.symbiosis\n";

/**
 * **DO NOT USE IT!!!!**
 *
 * Created so we can test the function with Jest
 */
export const internalCreateDotSymbiosisDir = ({
	getRootPath,
	mkdirSync,
	existsSync,
	readFileSync,
	writeFileSync,
	path,
}: InternalCreateDotSymbiosisDirParams) => {
	const dotSymbFolderPath = getRootPath(".symbiosis");

	// .symbiosis folder DONT exists
	if (!existsSync(dotSymbFolderPath)) {
		const gitIgnorePath = getRootPath(".gitignore");

		// .gitignore exists
		if (existsSync(gitIgnorePath)) {
			const gitIgnore = readFileSync(gitIgnorePath, "utf8");

			// .gitignore NOT ignores .symbiosis folder
			if (!gitIgnore.includes("\n/.symbiosis\n")) {
				// Insert final new line
				const ignore = gitIgnore.endsWith("\n\n")
					? gitIgnoreMessage
					: `${"\n\n"}${gitIgnoreMessage}`;

				writeFileSync(gitIgnorePath, `${gitIgnore}${ignore}`);
			}
		} else {
			// .gitignore DONT exists and DONT ignores .symbiosis folder
			writeFileSync(gitIgnorePath, `${gitIgnoreMessage}${"\n"}`);
		}
	}

	mkdirSync(`${dotSymbFolderPath}/${path.replace(/^\//, "")}`, {
		recursive: true,
	});
};
