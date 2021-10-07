import { EntityManager } from "../../..";
import { MetadataUtil, SymbiosisErrorCodeEnum } from "../../../../..";
import { SymbiosisError } from "../../../../error";
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

	if (MetadataUtil.isCustomMetadataType(columnMetadata.type)) {
		throw new SymbiosisError({
			message: "Invalid order",
			code: SymbiosisErrorCodeEnum.INVALID_PARAM,
			origin: "SYMBIOSIS",
			details: [
				`Column "${columnName}" is a subEntity, and cannot be used to ordering. Use a column of this subEntity`,
			],
		});
	}

	return columnMetadata.databaseName;
};
