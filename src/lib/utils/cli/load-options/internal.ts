import { BaseConnectionOptions } from "../../../connection/types/connection-options";
import { getConfigFile } from "./helpers/get-config.file";
import { validatePlugin } from "./helpers/validate-plugin";
import { validateEntities } from "./helpers/validate-entities";

interface InternalLoadOptionsParams {
	pluginName: string;
	possiblyConfig?: BaseConnectionOptions;
	isCliCall?: boolean;
	existsSync: (path: string) => boolean;
	internalRequire: (pkg: string) => any;
}

export const internalLoadOptions = ({
	pluginName,
	possiblyConfig,
	isCliCall,
	existsSync,
	internalRequire,
}: InternalLoadOptionsParams) => {
	const config = getConfigFile({
		pluginName,
		possiblyConfig,
		existsSync,
		internalRequire,
	});

	/**
	 * Only validates that the package is installed if the call
	 * comes from the cli, because if it's the lib that is calling this function,
	 * so for sure the plugin is installed.
	 *
	 * The validation cold stay here, but in minified apps, it's impossible to validate
	 * if the plugin is installed, so it's better to only validate on CLI calls.
	 */
	if (isCliCall) {
		validatePlugin({
			plugin: config.plugin,
		});
	}

	validateEntities(config);

	return config;
};
