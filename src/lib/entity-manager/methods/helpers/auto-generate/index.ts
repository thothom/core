import { getTypeof } from "@techmmunity/utils";
import { SymbiosisErrorCodeEnum } from "../../../../..";
import { BaseConnectionOptions } from "../../../../connection/types/connection-options";
import { SymbiosisError } from "../../../../error";
import { ColumnMetadata } from "../../../types/column-metadata";
import { EntityMetadata } from "../../../types/entity-metadata";
import { CustomClass } from "../../../types/metadata-type";
import { generateDate } from "./generate-date";
import { generateUuid } from "./generate-uuid";

interface AutoGenerateParams<Entity> {
	acc: Entity;
	connectionOptions: BaseConnectionOptions;
	columnMetadata: ColumnMetadata;
	entityMetadata: EntityMetadata;
	entity: CustomClass;
	data?: any;
}

export const autoGenerate = <Entity>({
	acc,
	columnMetadata,
	entityMetadata,
	connectionOptions,
	entity,
	data,
}: AutoGenerateParams<Entity>) => {
	const key = columnMetadata.name as keyof Entity;

	if (getTypeof(columnMetadata.autoGenerate) === "function") {
		acc[key] = (columnMetadata.autoGenerate as (...p: any) => any)({
			connectionOptions,
			columnMetadata,
			entityMetadata,
			data,
		});

		return;
	}

	switch (columnMetadata.autoGenerate) {
		case "date":
			acc[key] = generateDate(columnMetadata.type, connectionOptions) as any;

			return;
		case "uuid":
			acc[key] = generateUuid(require.resolve);

			return;
		default:
			throw new SymbiosisError({
				code: SymbiosisErrorCodeEnum.INVALID_PARAM,
				origin: "SYMBIOSIS",
				message: "Invalid auto generation method",
				details: [
					`Entity: ${(entity as any).name}`,
					`Column: ${columnMetadata.name}`,
				],
			});
	}
};
