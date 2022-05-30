/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */

import { isNotEmptyArray, getTypeof } from "@techmmunity/utils";

import { ThothError } from "../../../../error";

interface LoadTsFilesParams {
	entitiesPath: Array<string>;
	getRootPath: (path: string) => string;
	internalRequire: (pkg: string) => any;
	isPackageInstalled: (pkg: string) => boolean;
	createDotThothDir: (path: string) => void;
}

export const loadTsFiles = ({
	entitiesPath,
	getRootPath,
	internalRequire,
	isPackageInstalled,
	createDotThothDir,
}: LoadTsFilesParams) => {
	const tsFiles = entitiesPath.filter(path => path.endsWith(".ts"));

	if (isNotEmptyArray(tsFiles)) {
		if (!isPackageInstalled("typescript")) {
			throw new ThothError({
				code: "MISSING_DEPENDENCY",
				origin: "THOTHOM",
				message: "Missing dependency",
				details: ["Missing package: typescript"],
			});
		}

		const ts = internalRequire(getRootPath("node_modules/typescript")) as TS;

		const entitiesFolderPath = getRootPath(".thothom/entities");

		createDotThothDir(entitiesFolderPath);

		ts.createProgram(tsFiles, {
			module: ts.ModuleKind.CommonJS,
			moduleResolution: ts.ModuleResolutionKind.NodeJs,
			target: ts.ScriptTarget.ES2017,
			emitDecoratorMetadata: true,
			experimentalDecorators: true,
			outDir: entitiesFolderPath,
		}).emit();

		const jsFilesNames = tsFiles.map(file => {
			const fileName = file.split("/").pop()!.replace(".ts", "");

			return `${entitiesFolderPath}/${fileName}`;
		});

		return jsFilesNames
			.map(filePath => {
				const exports = internalRequire(filePath) as Record<string, any>;

				const entities = Object.values(exports).filter(
					val => getTypeof(val) === "class",
				);

				return entities;
			})
			.flat();
	}

	return [];
};
