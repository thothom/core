import { EntityManager } from "../../entity-manager";
import { SymbiosisError } from "../../error";
import { CustomClass } from "../../entity-manager/types/metadata-type";
import { MetadataUtil } from "../metadata-util";

interface ErrorOptions {
	ifLastFieldIsSubEntity?: {
		message: string;
		getDetails: (columnName: string) => Array<any>;
	};
}

interface GetColumnDatabaseNameParams {
	entityManager: EntityManager;
	entity: CustomClass;
	columnName: string;
	errorOptions?: ErrorOptions;
}

export const getColumnDatabaseName = ({
	entityManager,
	entity,
	columnName: rawColumnName,
	errorOptions = {},
}: GetColumnDatabaseNameParams) => {
	const { ifLastFieldIsSubEntity } = errorOptions;

	const columnName = rawColumnName.replace(/\[\]/g, "");

	const columnMetadata = entityManager.getColumnMetadata(entity, columnName);

	if (
		ifLastFieldIsSubEntity &&
		MetadataUtil.isCustomMetadataType(columnMetadata.type)
	) {
		throw new SymbiosisError({
			message: ifLastFieldIsSubEntity.message,
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			details: ifLastFieldIsSubEntity.getDetails(columnName),
		});
	}

	return `${columnMetadata.databaseName}${columnMetadata.isArray ? "[]" : ""}`;
};
