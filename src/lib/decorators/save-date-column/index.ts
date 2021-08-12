import { SaveDateColumnOptions } from "../types/column-options";
import { getDatabaseName } from "./helpers/get-database-name";
import { getType } from "./helpers/get-type";
import { MetadataUtil } from "../../utils/metadata-util";
import { autoGenerateFactory } from "./helpers/auto-generate-factory";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SaveDateColumn = (options?: SaveDateColumnOptions) => {
	return (entityPrototype: any, propertyName: string) => {
		const { databaseName, isNameAlreadyFormatted } = getDatabaseName({
			propertyName,
			options,
		});
		const type = getType({
			entityPrototype,
			propertyName,
		});

		MetadataUtil.addColumnMetadataToEntity({
			entity: entityPrototype.constructor,
			metadata: {
				name: propertyName,
				databaseName,
				isNameAlreadyFormatted,
				isAutoGenerated: true,
				autoGenerationType: "ENTITY_TO_DATABASE",
				autoGenerateOnlyOnEvents: ["save"],
				autoGenerate: autoGenerateFactory(type),
				type,
				primary: true,
				extras: (options as SaveDateColumnOptions)?.extras,
			},
		});
	};
};
