import { EntityManager } from "../..";
import { CustomClass } from "../../types/metadata-type";
import { getColumnDatabaseName } from "./helpers/get-column-database-name";
import { getMultipleLevelColumnName } from "./helpers/get-multiple-level-column-name";
import { isMultipleLevelsColumn } from "./helpers/is-multiple-levels-column";

interface Injectables {
	entityManager: EntityManager<any, any>;
}

export interface ConvertColumnsNamesParams {
	entity: CustomClass;
	columnsNames: Array<string>;
}

export const convertColumnsNames = (
	{ entityManager }: Injectables,
	{ entity, columnsNames }: ConvertColumnsNamesParams,
) =>
	columnsNames.map(columnName => {
		if (isMultipleLevelsColumn(columnName)) {
			return getMultipleLevelColumnName({
				entity,
				entityManager,
				originalColumnsNames: columnName.split("."),
			});
		}

		return getColumnDatabaseName({
			entityManager,
			entity,
			columnName,
		});
	});
