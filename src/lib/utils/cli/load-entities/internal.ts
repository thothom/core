/* eslint-disable sonarjs/no-duplicate-string */
import { isEmptyArray } from "@techmmunity/utils";

import { MetadataUtil } from "../../metadata-util";

import { loadJsFiles } from "./helpers/load-js-files";
import { loadTsFiles } from "./helpers/load-ts-files";

interface InternalLoadEntities {
	entitiesDir?: Array<string>;
	getRootPath: (path: string) => string;
	glob: (paths: string) => Promise<Array<string>>;
	internalRequire: (pkg: string) => any;
	isPackageInstalled: (pkg: string) => boolean;
	createDotThothDir: (path: string) => void;
}

export const internalLoadEntities = async ({
	entitiesDir,
	getRootPath,
	glob,
	internalRequire,
	isPackageInstalled,
	createDotThothDir,
}: InternalLoadEntities): Promise<Array<any>> => {
	if (!entitiesDir) {
		return [];
	}

	const entitiesPath = await Promise.all(
		entitiesDir.map(dir => glob(getRootPath(dir))),
	).then(result => result.flat());

	if (isEmptyArray(entitiesPath)) {
		return [];
	}

	const allEntities = [
		...loadJsFiles({
			entitiesPath,
			internalRequire,
		}),
		...loadTsFiles({
			entitiesPath,
			getRootPath,
			internalRequire,
			isPackageInstalled,
			createDotThothDir,
		}),
	];

	if (isEmptyArray(allEntities)) {
		return [];
	}

	return allEntities.filter(entity => {
		const isSubEntity = MetadataUtil.getEntityMetadata({
			entity,
			metadataKey: "isSubEntity",
		});

		return isSubEntity !== true;
	});
};
