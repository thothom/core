import type { Logger } from "../../../logger";

import { getEntitiesMetadata } from "./helpers/get-entities-metadata";
import { getSubEntitiesMetadata } from "./helpers/get-sub-entities-metadata";

import type { BaseConnectionOptions } from "../../../connection/types/connection-options";
import type { BaseExtraMetadata } from "../../../types/extra-metadata";
import type { EntityManagerEntities } from "../../types/manager-metadata";
import type { CustomClass } from "../../types/metadata-type";

export interface LoadEntitiesParams {
	connectionOptions: BaseConnectionOptions;
	logger: Logger;
	entities: Array<CustomClass>;
}

export const loadEntities = <ExtraMetadata extends BaseExtraMetadata>({
	connectionOptions,
	logger,
	entities: rawEntities,
}: LoadEntitiesParams) => {
	const { entities, columns } = getEntitiesMetadata({
		logger,
		rawEntities,
		connectionOptions,
	});

	getSubEntitiesMetadata({
		entities,
		logger,
		connectionOptions,
		allEntitiesColumns: columns,
	});

	return entities as EntityManagerEntities<ExtraMetadata>;
};
