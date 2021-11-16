import { EntityManager } from "../../../entity-manager";
import { CustomClass } from "../../../entity-manager/types/metadata-type";

interface HandleDataParams {
	data: Array<any>;
	entityManager: EntityManager;
	entity: CustomClass;
}

export const basicFormatDataArray = <Entity>({
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
