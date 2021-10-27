import { BaseConnectionOptions } from "../../../connection/types/connection-options";
import { getConfigFile } from "./helpers/get-config.file";
import { validatePlugin } from "./helpers/validate-plugin";
import { validateEntities } from "./helpers/validate-entities";

interface InternalLoadOptionsParams {
	pluginName: string;
	possiblyConfig?: BaseConnectionOptions;
	existsSync: (path: string) => boolean;
	internalRequire: (pkg: string) => any;
}

export const internalLoadOptions = ({
	pluginName,
	possiblyConfig,
	existsSync,
	internalRequire,
}: InternalLoadOptionsParams) => {
	const config = getConfigFile({
		pluginName,
		possiblyConfig,
		existsSync,
		internalRequire,
	});

	validatePlugin({
		plugin: config.plugin,
	});
	validateEntities(config);

	return config;
};
