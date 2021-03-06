import type { EntityManager } from "../../entity-manager";
import { ThothError } from "../../error";
import { MetadataUtil } from "../metadata-util";

import type { CustomClass } from "../../entity-manager/types/metadata-type";

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
		throw new ThothError({
			message: ifLastFieldIsSubEntity.message,
			code: "INVALID_PARAM",
			origin: "THOTHOM",
			details: ifLastFieldIsSubEntity.getDetails(columnName),
		});
	}

	return `${columnMetadata.databaseName}${columnMetadata.isArray ? "[]" : ""}`;
};
