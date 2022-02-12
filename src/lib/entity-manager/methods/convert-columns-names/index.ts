import type { EntityManager } from "../..";

import { getColumnDatabaseName } from "../../../utils/convert/get-column-database-name";
import { getMultipleLevelColumnName } from "../../../utils/convert/get-multiple-level-column-name";
import { isMultipleLevelsColumn } from "../../../utils/convert/is-multiple-levels-column";

import type { CustomClass } from "../../types/metadata-type";

interface Injectables {
	entityManager: EntityManager;
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
