interface InternalCreateDotThothDirParams {
	getRootPath: (path: string) => string;
	mkdirSync: (path: string, options: { recursive: true }) => void;
	existsSync: (path: string) => boolean;
	readFileSync: (path: string, encoding: "utf8") => string;
	writeFileSync: (path: string, data: string) => void;
	path: string;
}

export const gitIgnoreMessage =
	"# Do not touch it! Thoth needs this exact exclude, or will generate it again.\n/.thothom\n";

/**
 * **DO NOT USE IT!!!!**
 *
 * Created so we can test the function with Jest
 */
export const internalCreateDotThothDir = ({
	getRootPath,
	mkdirSync,
	existsSync,
	readFileSync,
	writeFileSync,
	path,
}: InternalCreateDotThothDirParams) => {
	const dotThothFolderPath = getRootPath(".thothom");

	// .thothom folder DONT exists
	if (!existsSync(dotThothFolderPath)) {
		const gitIgnorePath = getRootPath(".gitignore");

		// .gitignore exists
		if (existsSync(gitIgnorePath)) {
			const gitIgnore = readFileSync(gitIgnorePath, "utf8");

			// .gitignore NOT ignores .thothom folder
			if (!gitIgnore.includes("\n/.thothom\n")) {
				// Insert final new line
				const ignore = gitIgnore.endsWith("\n\n")
					? gitIgnoreMessage
					: `${"\n\n"}${gitIgnoreMessage}`;

				writeFileSync(gitIgnorePath, `${gitIgnore}${ignore}`);
			}
		} else {
			// .gitignore DONT exists and DONT ignores .thothom folder
			writeFileSync(gitIgnorePath, `${gitIgnoreMessage}${"\n"}`);
		}
	}

	mkdirSync(`${dotThothFolderPath}/${path.replace(/^\//, "")}`, {
		recursive: true,
	});
};
