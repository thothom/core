import { getGlobalConnection } from "./get-global-connection";

export const getGlobalRepository = <Entity>(
	entity: any,
	connectionName?: string,
) => {
	const connection = getGlobalConnection(connectionName);

	return connection.getRepository<Entity>(entity);
};
