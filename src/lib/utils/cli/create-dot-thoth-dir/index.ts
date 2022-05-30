import { getRootPath } from "@techmmunity/utils";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";

import { internalCreateDotThothDir } from "./internal";

/**
 * Recursively create the folders of .thothom folder
 */
export const createDotThothDir = (path: string) =>
	internalCreateDotThothDir({
		mkdirSync,
		existsSync,
		readFileSync,
		writeFileSync,
		getRootPath,
		path,
	});
