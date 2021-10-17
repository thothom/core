/* eslint-disable @typescript-eslint/no-var-requires */

import { SymbiosisError } from "../../../../error";
import { SymbiosisErrorCodeEnum } from "../../../../error/types/error-code.enum";

export const generateUuid = (
	/*
	 * This is done this way so that a unit test can be done to
	 * see what happens if the lib is not installed
	 */
	checkIfLibExists: (libName: string) => string,
) => {
	try {
		checkIfLibExists("uuid");

		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const { v4 } = require("uuid");

		return v4();
	} catch (_) {
		throw new SymbiosisError({
			code: SymbiosisErrorCodeEnum.INVALID_PARAM,
			message: "Invalid param",
			origin: "SYMBIOSIS",
			details: [
				'To use the "uuid" option, you need to install the "uuid" lib.',
				"Example: `yarn add uuid` OR `npm i --save uuid`",
			],
		});
	}
};
