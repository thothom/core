import { getTypeof } from "@techmmunity/utils";
import { BaseConnectionOptions } from "../../../../connection/types/connection-options";
import { ColumnMetadata } from "../../../types/column-metadata";
import { EntityMetadata } from "../../../types/entity-metadata";
import { generateDate } from "./generate-date";
import { generateUuid } from "./generate-uuid";

interface AutoGenerateParams {
	connectionOptions: BaseConnectionOptions;
	columnMetadata: ColumnMetadata;
	entityMetadata: EntityMetadata;
	data?: any;
}

export const autoGenerate = ({
	columnMetadata,
	entityMetadata,
	connectionOptions,
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
			// "autoGenerate" can also be an raw value
			return columnMetadata.autoGenerate;
	}
};
