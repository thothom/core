import { EntityManager } from "../../../../entity-manager";
import { CustomClass } from "../../../../entity-manager/types/metadata-type";
import { DatabaseEntity } from "../../../../types/database-entity";

interface HandleDataParams {
	data: Array<DatabaseEntity>;
	entityManager: EntityManager;
	entity: CustomClass;
}

export const formatData = <Entity>({
	data,
	entity,
	entityManager,
}: HandleDataParams) => {
	const dataInEntityFormat = data.map(d =>
		entityManager.convertDatabaseToEntity<Entity>({
			data: d,
			entity,
		}),
	);

	return dataInEntityFormat;
};
