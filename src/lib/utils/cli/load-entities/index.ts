import { getRootPath, isPackageInstalled } from "@techmmunity/utils";

import { createDotThothDir } from "../create-dot-thoth-dir";
import { glob } from "../glob";

import { internalLoadEntities } from "./internal";

export const loadEntities = (entitiesDir?: Array<string>) =>
	internalLoadEntities({
		entitiesDir,
		getRootPath,
		glob,
		isPackageInstalled,
		createDotThothDir,
		internalRequire: require,
	});
