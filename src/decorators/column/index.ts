import { ColumnMetadataEnum } from "../../enums/columns-metadata";
import { ColumnOptions } from "../types/column-options";
import { MetadataType } from "../../utils/metadata/is-metadata-type";
import { getName } from "./helpers/get-name";
import { getType } from "./helpers/get-type";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Column = (typeOrOptions?: ColumnOptions | MetadataType) => {
	return (target: any, propertyName: string) => {
		const name = getName({
			propertyName,
			typeOrOptions,
		});
		const { type, isArray } = getType({
			target,
			propertyName,
			typeOrOptions,
		});

		Reflect.defineMetadata(ColumnMetadataEnum.NAME, name, target, propertyName);
		Reflect.defineMetadata(ColumnMetadataEnum.TYPE, type, target, propertyName);
		Reflect.defineMetadata(
			ColumnMetadataEnum.IS_ARRAY,
			isArray,
			target,
			propertyName,
		);
	};
};
