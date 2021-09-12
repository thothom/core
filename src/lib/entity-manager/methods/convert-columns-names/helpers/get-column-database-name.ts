import { EntityManager } from "../../..";
import { CustomClass } from "../../../types/metadata-type";

interface GetColumnDatabaseNameParams {
	entityManager: EntityManager<any, any>;
	entity: CustomClass;
	columnName: string;
}

export const getColumnDatabaseName = ({
	entityManager,
	entity,
	columnName,
}: GetColumnDatabaseNameParams) => {
	const columnMetadata = entityManager.getColumnMetadata(entity, columnName);

	return columnMetadata.databaseName;
};
