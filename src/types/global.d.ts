/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */

import { BaseConnection } from "..";

declare global {
	/**
	 * THE USE OF `var` IS REQUIRED!!!!
	 */
	var symbiosisConnections: Record<string, BaseConnection> | undefined;
}

/*
 * If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 */
export {};
