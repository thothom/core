import type { EntityManager } from "../../../entity-manager";

import type { CustomClass } from "../../../entity-manager/types/metadata-type";

interface HandleDataParams {
	data: Array<any>;
	entityManager: EntityManager;
	entity: CustomClass;
}

export const afterFormatDataArray = <Entity>({
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

	return dataInEntityFormat as Array<Entity>;
};
