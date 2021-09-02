import { EntityManager } from "../../../../entity-manager";
import { CustomClass } from "../../../../entity-manager/types/metadata-type";

interface HandleDataParams {
	data: any;
	entityManager: EntityManager<any, any>;
	entity: CustomClass;
}

export const handleData = ({
	data,
	entity,
	entityManager,
}: HandleDataParams) => {
	const dataInEntityFormat = entityManager.convertDatabaseToEntity({
		data,
		entity,
	});

	return dataInEntityFormat;
};
