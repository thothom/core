import { BaseConnection } from "../../connection";

export const setGlobalConnection = (connection: BaseConnection) => {
	if (global.symbiosisConnections) {
		global.symbiosisConnections[connection.name] = connection;

		return;
	}

	global.symbiosisConnections = {
		[connection.name]: connection,
	};
};
