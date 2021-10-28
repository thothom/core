import { existsSync } from "fs";
import { BaseConnectionOptions } from "../../../connection/types/connection-options";
import { internalLoadOptions } from "./internal";

export const loadOptions = (
	pluginName: string,
	possiblyConfig?: BaseConnectionOptions,
) =>
	internalLoadOptions({
		pluginName,
		possiblyConfig,
		existsSync,
		internalRequire: require,
	});
