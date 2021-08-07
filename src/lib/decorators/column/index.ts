import { ColumnOptions } from "../types/column-options";
import { getSemiFormattedName } from "./helpers/get-semi-formatted-name";
import { getType } from "./helpers/get-type";
import { MetadataType } from "../../metadata-manager/types/metadata-type";
import { addColumnMetadata } from "./helpers/add-column-metadata";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Column = (typeOrOptions?: ColumnOptions | MetadataType) => {
	return (entityPrototype: any, propertyName: string) => {
		const formattedName = getSemiFormattedName({
			propertyName,
			typeOrOptions,
		});
		const { type, isArray } = getType({
			entityPrototype,
			propertyName,
			typeOrOptions,
		});

		addColumnMetadata({
			entity: entityPrototype,
			metadata: {
				name: propertyName,
				formattedName,
				type,
				isArray,
				extras: (typeOrOptions as ColumnOptions)?.extras,
			},
		});
	};
};
