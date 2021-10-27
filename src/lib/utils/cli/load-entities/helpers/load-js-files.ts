/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

import { isNotEmptyArray, getTypeof } from "@techmmunity/utils";

interface LoadJsFilesParams {
	entitiesPath: Array<string>;
	internalRequire: (pkg: string) => any;
}

export const loadJsFiles = ({
	entitiesPath,
	internalRequire,
}: LoadJsFilesParams) => {
	const jsFiles = entitiesPath.filter(path => path.endsWith(".js"));

	if (isNotEmptyArray(jsFiles)) {
		return jsFiles
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
