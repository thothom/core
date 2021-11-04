/* eslint-disable sonarjs/no-duplicate-string */
import { isEmptyArray } from "@techmmunity/utils";
import { SymbiosisError } from "../../../error";
import { MetadataUtil } from "../../metadata-util";
import { loadJsFiles } from "./helpers/load-js-files";
import { loadTsFiles } from "./helpers/load-ts-files";

interface InternalLoadEntities {
	entitiesDir?: Array<string>;
	getRootPath: (path: string) => string;
	glob: (paths: string) => Promise<Array<string>>;
	internalRequire: (pkg: string) => any;
	isPackageInstalled: (pkg: string) => boolean;
	createDotSymbiosisDir: (path: string) => void;
}

export const internalLoadEntities = async ({
	entitiesDir,
	getRootPath,
	glob,
	internalRequire,
	isPackageInstalled,
	createDotSymbiosisDir,
}: InternalLoadEntities): Promise<Array<any>> => {
	if (!entitiesDir) {
		throw new SymbiosisError({
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			message: "Missing config",
			details: ['"entities" or "entitiesDir" must be provided'],
		});
	}

	const entitiesPath = await Promise.all(
		entitiesDir.map(dir => glob(getRootPath(dir))),
	).then(result => result.flat());

	if (isEmptyArray(entitiesPath)) {
		throw new SymbiosisError({
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			message: "Missing config",
			details: [`No entities found at: ${entitiesDir.join(", ")}`],
		});
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
			createDotSymbiosisDir,
		}),
	];

	if (isEmptyArray(allEntities)) {
		throw new SymbiosisError({
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			message: "Missing config",
			details: [`No entities found at: ${entitiesPath.join(", ")}`],
		});
	}

	return allEntities.filter(entity => {
		const isSubEntity = MetadataUtil.getEntityMetadata({
			entity,
			metadataKey: "isSubEntity",
		});

		return isSubEntity !== true;
	});
};
