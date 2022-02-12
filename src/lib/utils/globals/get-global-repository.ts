import type { BaseRepository } from "../../repository";

import { getGlobalConnection } from "./get-global-connection";

export const getGlobalRepository = <Repository extends BaseRepository>(
	entity: any,
	connectionName?: string,
) => {
	const connection = getGlobalConnection(connectionName);

	return connection.getRepository(entity) as unknown as Repository;
};
