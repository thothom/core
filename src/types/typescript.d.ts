/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */

import ts from "typescript";

declare global {
	type TS = typeof ts;
}

/*
 * If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 */
export {};
