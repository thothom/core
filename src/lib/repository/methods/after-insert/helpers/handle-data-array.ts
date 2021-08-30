import { EntityManager } from "../../../../entity-manager";
import { CustomClass } from "../../../../entity-manager/types/metadata-type";

interface HandleDataArrayParams {
	data: Array<any>;
	entityManager: EntityManager<any, any>;
	entity: CustomClass;
}

export const handleDataArray = ({
	data,
	entity,
	entityManager,
}: HandleDataArrayParams) => {
	const dataInEntityFormat = data.map(d =>
		entityManager.convertDatabaseToEntity({
			data: d,
			entity,
		}),
	);

	return dataInEntityFormat;
};
