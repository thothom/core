import { getTypeof } from "@techmmunity/utils";

import { SymbiosisError } from "../../../../error";

import type { BaseConnectionOptions } from "../../../../connection/types/connection-options";

export const validateEntities = (config: BaseConnectionOptions) => {
	if (!config.entities && !config.entitiesDir) {
		throw new SymbiosisError({
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			message: "Missing config",
			details: ["Missing config: entities OR entitiesDir"],
		});
	}

	if (
		config.entities &&
		(getTypeof(config.entities) !== "array" ||
			!config.entities.every(entity => getTypeof(entity) === "class"))
	) {
		throw new SymbiosisError({
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			message: "Invalid entities",
			details: ["`entities` option must be an array of entities"],
		});
	}

	if (
		config.entitiesDir &&
		(getTypeof(config.entitiesDir) !== "array" ||
			!config.entitiesDir.every(entity => getTypeof(entity) === "string"))
	) {
		throw new SymbiosisError({
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			message: "Invalid entities",
			details: [
				"`entitiesDir` options must be an array of strings (entities paths)",
			],
		});
	}
};
