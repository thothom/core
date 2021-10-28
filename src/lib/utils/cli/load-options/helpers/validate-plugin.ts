import { isPackageInstalled } from "@techmmunity/utils";

import { SymbiosisError } from "../../../../error";

interface ValidatePluginParams {
	plugin?: string;
}

export const validatePlugin = ({ plugin }: ValidatePluginParams) => {
	if (!plugin) {
		throw new SymbiosisError({
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			message: "Missing config",
			details: ["Missing config: plugin"],
		});
	}

	if (!isPackageInstalled(plugin)) {
		throw new SymbiosisError({
			code: "MISSING_DEPENDENCY",
			origin: "SYMBIOSIS",
			message: "Missing dependency",
			details: [`Plugin not found: ${plugin}`],
		});
	}
};
