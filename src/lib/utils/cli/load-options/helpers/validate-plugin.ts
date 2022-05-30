import { isPackageInstalled } from "@techmmunity/utils";

import { ThothError } from "../../../../error";

interface ValidatePluginParams {
	plugin?: string;
}

export const validatePlugin = ({ plugin }: ValidatePluginParams) => {
	if (!plugin) {
		throw new ThothError({
			code: "INVALID_PARAM",
			origin: "THOTHOM",
			message: "Missing config",
			details: ["Missing config: plugin"],
		});
	}

	if (!isPackageInstalled(plugin)) {
		throw new ThothError({
			code: "MISSING_DEPENDENCY",
			origin: "THOTHOM",
			message: "Missing dependency",
			details: [`Plugin not found: ${plugin}`],
		});
	}
};
