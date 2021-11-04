import { getRootPath, isPackageInstalled } from "@techmmunity/utils";

import { createDotSymbiosisDir } from "../create-dot-symb-dir";
import { glob } from "../glob";
import { internalLoadEntities } from "./internal";

export const loadEntities = (entitiesDir?: Array<string>) =>
	internalLoadEntities({
		entitiesDir,
		getRootPath,
		glob,
		isPackageInstalled,
		createDotSymbiosisDir,
		internalRequire: require,
	});
