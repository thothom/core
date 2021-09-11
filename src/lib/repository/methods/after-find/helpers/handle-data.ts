import { EntityManager } from "../../../../entity-manager";
import { CustomClass } from "../../../../entity-manager/types/metadata-type";

interface HandleDataParams {
	data: Array<Record<string, any>>;
	entityManager: EntityManager<any, any>;
	entity: CustomClass;
}

export const handleData = ({
	data,
	entity,
	entityManager,
}: HandleDataParams) => {
	const dataInEntityFormat = data.map(d =>
		entityManager.convertDatabaseToEntity({
			data: d,
			entity,
		}),
	);

	return dataInEntityFormat;
};
