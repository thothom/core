import { DEFAULT_CONNECTION_NAME } from "../../../config";
import type { BaseConnection } from "../../connection";
import { ThothError } from "../../error";

export const getGlobalConnection = <Connection extends BaseConnection>(
	connectionName?: string,
) => {
	const conName = connectionName || DEFAULT_CONNECTION_NAME;

	if (global.thothConnections) {
		const connection = global.thothConnections[conName];

		if (connection) return connection as Connection;

		throw new ThothError({
			code: "INVALID_PARAM",
			origin: "THOTHOM",
			message: "Invalid param",
			details: [`Connection "${conName}" not found."`],
		});
	}

	throw new ThothError({
		code: "INVALID_EXECUTION_ORDER",
		origin: "THOTHOM",
		message: "Invalid execution order",
		details: [
			"You must call `setGlobalConnection` before call `getGlobalConnection`. If you are doing this, please check the connection name.",
		],
	});
};
