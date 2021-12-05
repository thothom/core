import { getRootPath, getTypeof } from "@techmmunity/utils";
import { BaseConnectionOptions } from "../../../../connection/types/connection-options";
import { SymbiosisError } from "../../../../error";

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
		const path = getRootPath("symbiosis.config.js");

		if (!existsSync(path)) {
			throw new SymbiosisError({
				code: "INVALID_PARAM",
				origin: "SYMBIOSIS",
				message: "Missing config",
				details: [
					"Missing config options and config file",
					"You can install the cli `@techmmunity/symbiosis-cli` and use `npx symb gen:config` to automatic generate a config file, or specify the options at the Connection class constructor",
				],
			});
		}

		rawConfig = internalRequire(path) as BaseConnectionOptions;
	}

	if (getTypeof(rawConfig) !== "object") {
		throw new SymbiosisError({
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			message: "Missing config file",
			details: [
				"Missing config file: symbiosis.config.js",
				"You can install the cli `@techmmunity/symbiosis-cli` and use `npx symb gen:config` to automatic generate a config file",
			],
		});
	}

	return {
		...rawConfig,
		plugin: pluginName,
	};
};
