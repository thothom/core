import { MetadataUtil } from "../../../..";
import { ColumnMetadata } from "../../../entity-manager/types/column-metadata";
import { SymbiosisError } from "../../../error";

interface ValidateForeignKeyParams {
	foreignKey: string;
	currentEntity: any;
	targetEntity: any;
}

const ERROR_MESSAGE = "Invalid Foreign Key";

export const validateForeignKey = ({
	foreignKey,
	currentEntity,
	targetEntity,
}: ValidateForeignKeyParams) => {
	const [entityName, columnName] = foreignKey.split(".");

	if (!entityName || !columnName) {
		throw new SymbiosisError({
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			message: ERROR_MESSAGE,
			details: [
				`Foreign keys must follow the pattern "entityName.columnName", received "${foreignKey}"`,
			],
		});
	}

	const columns: Array<ColumnMetadata> =
		MetadataUtil.getEntityMetadata({
			metadataKey: "columns",
			entity: currentEntity.name === entityName ? currentEntity : targetEntity,
		}) || [];

	const column = columns.find(c => c.name === columnName);

	if (!column) {
		throw new SymbiosisError({
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			message: ERROR_MESSAGE,
			details: [
				`Column "${columnName}" does not exist in entity "${entityName}"`,
			],
		});
	}
};
