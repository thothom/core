import { getRootPath } from "@techmmunity/utils";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";

import { internalCreateDotSymbiosisDir } from "./internal";

/**
 * Recursively create the folders of .symbiosis folder
 */
export const createDotSymbiosisDir = (path: string) =>
	internalCreateDotSymbiosisDir({
		mkdirSync,
		existsSync,
		readFileSync,
		writeFileSync,
		getRootPath,
		path,
	});
