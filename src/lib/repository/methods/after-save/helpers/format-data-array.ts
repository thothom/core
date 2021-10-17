import { EntityManager } from "../../../../entity-manager";
import { CustomClass } from "../../../../entity-manager/types/metadata-type";

interface HandleDataArrayParams {
	data: Array<any>;
	entityManager: EntityManager;
	entity: CustomClass;
}

export const formatDataArray = <Entity>({
	data,
	entity,
	entityManager,
}: HandleDataArrayParams) => {
	const dataInEntityFormat = data.map(d =>
		entityManager.convertDatabaseToEntity<Entity>({
			data: d,
			entity,
		}),
	);

	return dataInEntityFormat;
};
