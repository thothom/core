import { getRootPath, getTypeof } from "@techmmunity/utils";

import { ThothError } from "../../../../error";

import type { BaseConnectionOptions } from "../../../../connection/types/connection-options";

interface GetConfigFileParams {
	pluginName: string;
	possiblyConfig?: BaseConnectionOptions;
	existsSync: (path: string) => boolean;
	internalRequire: (pkg: string) => any;
}

export const getConfigFile = ({
	pluginName,
	possiblyConfig,
	existsSync,
	internalRequire,
}: GetConfigFileParams): BaseConnectionOptions => {
	let rawConfig: BaseConnectionOptions;

	if (possiblyConfig) {
		rawConfig = possiblyConfig;
	} else {
		const path = getRootPath("thothom.config.js");

		if (!existsSync(path)) {
			throw new ThothError({
				code: "INVALID_PARAM",
				origin: "THOTHOM",
				message: "Missing config",
				details: [
					"Missing config options and config file",
					"You can install the cli `@thothom/cli` and use `npx thothom gen:config` to automatic generate a config file, or specify the options at the Connection class constructor",
				],
			});
		}

		rawConfig = internalRequire(path) as BaseConnectionOptions;
	}

	if (getTypeof(rawConfig) !== "object") {
		throw new ThothError({
			code: "INVALID_PARAM",
			origin: "THOTHOM",
			message: "Missing config file",
			details: [
				"Missing config file: thothom.config.js",
				"You can install the cli `@thothom/cli` and use `npx thothom gen:config` to automatic generate a config file",
			],
		});
	}

	return {
		...rawConfig,
		plugin: pluginName,
	};
};
