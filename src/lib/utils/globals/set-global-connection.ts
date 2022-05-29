import type { BaseConnection } from "../../connection";

export const setGlobalConnection = <Connection extends BaseConnection>(
	connection: Connection,
) => {
	if (global.thothConnections) {
		global.thothConnections[connection.name] = connection;

		return;
	}

	global.thothConnections = {
		[connection.name]: connection,
	};
};
