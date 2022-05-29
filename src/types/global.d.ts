/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */

import type ts from "typescript";

import type { BaseConnection } from "..";

declare global {
	/**
	 * THE USE OF `var` IS REQUIRED!!!!
	 */
	var thothConnections: Record<string, BaseConnection> | undefined;

	type TS = typeof ts;

	type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
}

/*
 * If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 */
export {};
