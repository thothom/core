import { getRootPath, isPackageInstalled } from "@techmmunity/utils";

import { createDotSymbiosisDir } from "../create-dot-symb-dir";
import { globUtil } from "../glob";
import { internalLoadEntities } from "./internal";

export const loadEntities = (entitiesDir: Array<string>) =>
	internalLoadEntities({
		entitiesDir,
		getRootPath,
		globUtil,
		isPackageInstalled,
		createDotSymbiosisDir,
		internalRequire: require,
	});
