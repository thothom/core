import type { BaseConnection } from "../../connection";

export const setGlobalConnection = <Connection extends BaseConnection>(
	connection: Connection,
) => {
	if (global.symbiosisConnections) {
		global.symbiosisConnections[connection.name] = connection;

		return;
	}

	global.symbiosisConnections = {
		[connection.name]: connection,
	};
};
