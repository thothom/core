import { EntityManager } from "../../entity-manager";
import { MetadataUtil, SymbiosisErrorCodeEnum } from "../../..";
import { SymbiosisError } from "../../error";
import { CustomClass } from "../../entity-manager/types/metadata-type";

interface ErrorOptions {
	ifLastFieldIsSubEntity?: {
		message: string;
		getDetails: (columnName: string) => Array<any>;
	};
}

interface GetColumnDatabaseNameParams {
	entityManager: EntityManager<any, any>;
	entity: CustomClass;
	columnName: string;
	errorOptions?: ErrorOptions;
}

export const getColumnDatabaseName = ({
	entityManager,
	entity,
	columnName,
	errorOptions = {},
}: GetColumnDatabaseNameParams) => {
	const { ifLastFieldIsSubEntity } = errorOptions;

	const columnMetadata = entityManager.getColumnMetadata(entity, columnName);

	if (
		ifLastFieldIsSubEntity &&
		MetadataUtil.isCustomMetadataType(columnMetadata.type)
	) {
		throw new SymbiosisError({
			message: ifLastFieldIsSubEntity.message,
			code: SymbiosisErrorCodeEnum.INVALID_PARAM,
			origin: "SYMBIOSIS",
			details: ifLastFieldIsSubEntity.getDetails(columnName),
		});
	}

	return columnMetadata.databaseName;
};
