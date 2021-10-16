import { ColumnOptions } from "../types/column-options";
import { getSemiFormattedName } from "./helpers/get-semi-formatted-name";
import { getType } from "./helpers/get-type";
import { MetadataType } from "../../entity-manager/types/metadata-type";
import { MetadataUtil } from "../../utils/metadata-util";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Column = (typeOrOptions?: ColumnOptions | MetadataType) => {
	return (entityPrototype: any, propertyName: string) => {
		const { databaseName, isNameAlreadyFormatted } = getSemiFormattedName({
			propertyName,
			typeOrOptions,
		});
		const { type, isArray } = getType({
			entityPrototype,
			propertyName,
			typeOrOptions,
		});

		const possiblyColumnOptions = typeOrOptions as ColumnOptions;

		MetadataUtil.addColumnMetadataToEntity({
			entity: entityPrototype.constructor,
			metadata: {
				databaseName,
				isNameAlreadyFormatted,
				type,
				isArray,
				name: propertyName,
				defaultValue: possiblyColumnOptions?.defaultValue,
				extras: possiblyColumnOptions?.extras,
			},
		});
	};
};
