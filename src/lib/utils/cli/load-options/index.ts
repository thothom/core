import { existsSync } from "fs";

import { internalLoadOptions } from "./internal";

import type { BaseConnectionOptions } from "../../../connection/types/connection-options";

export const loadOptions = (
	pluginName: string,
	possiblyConfig?: BaseConnectionOptions,
	isCliCall?: boolean,
) =>
	internalLoadOptions({
		pluginName,
		possiblyConfig,
		isCliCall,
		existsSync,
		internalRequire: require,
	});
