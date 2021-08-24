import { BaseConnectionOptions } from "../../../connection/types/connection-options";
import { Logger } from "../../../logger";
import { EntityManagerEntities } from "../../types/manager-metadata";
import { CustomClass } from "../../types/metadata-type";
import { getEntitiesMetadata } from "./helpers/get-entities-metadata";
import { getSubEntitiesMetadata } from "./helpers/get-sub-entities-metadata";

export interface LoadEntitiesParams {
	connectionOptions: BaseConnectionOptions;
	logger: Logger;
	entities: Array<CustomClass>;
}

export const loadEntities = <EntityExtraMetadata, ColumnExtraMetadata>({
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

	return entities as EntityManagerEntities<
		EntityExtraMetadata,
		ColumnExtraMetadata
	>;
};
