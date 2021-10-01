import { EntityManager } from "../..";
import { CustomClass } from "../../types/metadata-type";
import { getColumnDatabaseName } from "./helpers/get-column-database-name";
import { getMultipleLevelColumnName } from "./helpers/get-multiple-level-column-name";
import { isMultipleLevelsColumn } from "./helpers/is-multiple-levels-column";

interface Injectables {
	entityManager: EntityManager<any, any>;
}

export interface FormatOrderParams {
	entity: CustomClass;
	orderBy: Record<string, "ASC" | "DESC">;
}

export const formatOrder = (
	{ entityManager }: Injectables,
	{ entity, orderBy }: FormatOrderParams,
): Record<string, any> => {
	const entries = Object.entries(orderBy).map(([columnName, order]) => {
		if (isMultipleLevelsColumn(columnName)) {
			const formattedColumnName = getMultipleLevelColumnName({
				entity,
				entityManager,
				originalColumnsNames: columnName.split("."),
			});

			return [formattedColumnName, order];
		}

		const formattedColumnName = getColumnDatabaseName({
			entityManager,
			entity,
			columnName,
		});

		return [formattedColumnName, order];
	});

	return Object.fromEntries(entries);
};
