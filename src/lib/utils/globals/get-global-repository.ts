import { getGlobalConnection } from "./get-global-connection";

export const getGlobalRepository = (entity: any, connectionName?: string) => {
	const connection = getGlobalConnection(connectionName);

	return connection.getRepository(entity);
};
