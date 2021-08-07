/* eslint-disable @typescript-eslint/naming-convention */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			COMPASS_DEBUG: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// Convert it into a module by adding an empty export statement.
export {};
