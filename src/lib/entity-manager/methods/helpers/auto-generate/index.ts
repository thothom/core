import { getTypeof } from "@techmmunity/utils";
import { BaseConnectionOptions } from "../../../../connection/types/connection-options";
import { SymbiosisError } from "../../../../error";
import { ColumnMetadata } from "../../../types/column-metadata";
import { EntityMetadata } from "../../../types/entity-metadata";
import { CustomClass } from "../../../types/metadata-type";
import { generateDate } from "./generate-date";
import { generateUuid } from "./generate-uuid";

interface AutoGenerateParams {
	connectionOptions: BaseConnectionOptions;
	columnMetadata: ColumnMetadata;
	entityMetadata: EntityMetadata;
	entity: CustomClass;
	data?: any;
}

export const autoGenerate = ({
	columnMetadata,
	entityMetadata,
	connectionOptions,
	entity,
	data,
}: AutoGenerateParams) => {
	if (getTypeof(columnMetadata.autoGenerate) === "function") {
		return (columnMetadata.autoGenerate as (...p: any) => any)({
			connectionOptions,
			columnMetadata,
			entityMetadata,
			data,
		});
	}

	switch (columnMetadata.autoGenerate) {
		case "date":
			return generateDate(columnMetadata.type, connectionOptions) as any;

		case "uuid":
			return generateUuid(require.resolve);

		default:
			throw new SymbiosisError({
				code: "INVALID_PARAM",
				origin: "SYMBIOSIS",
				message: "Invalid auto generation method",
				details: [
					`Entity: ${(entity as any).name}`,
					`Column: ${columnMetadata.name}`,
				],
			});
	}
};
