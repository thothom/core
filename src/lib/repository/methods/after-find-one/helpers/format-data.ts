import { EntityManager } from "../../../../entity-manager";
import { CustomClass } from "../../../../entity-manager/types/metadata-type";
import { DatabaseEntity } from "../../../../types/database-entity";

interface HandleDataParams {
	data: DatabaseEntity;
	entityManager: EntityManager<any, any>;
	entity: CustomClass;
}

export const formatData = ({
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
