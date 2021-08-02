import { metadataManager } from "../../../metadata-manager";
import { ColumnMetadataEnum } from "../../../enums/columns-metadata";
import { PrimaryColumnOptions } from "../../../types/options/column-options";
import { getName } from "./helpers/get-name";
import { getType } from "./helpers/get-type";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrimaryColumn = (
	nameOrOptions?: PrimaryColumnOptions | string,
) => {
	return (classPrototype: any, propertyName: string) => {
		const name = getName({
			propertyName,
			nameOrOptions,
		});
		const type = getType({
			target: classPrototype,
			propertyName,
		});

		const defineMetadata = (metadataName: string, value: any) =>
			Reflect.defineMetadata(metadataName, value, classPrototype, propertyName);

		defineMetadata(ColumnMetadataEnum.NAME, name);
		defineMetadata(ColumnMetadataEnum.TYPE, type);
		defineMetadata(ColumnMetadataEnum.PRIMARY, true);

		metadataManager.addEntityPrimaryKey(
			classPrototype.constructor,
			propertyName,
		);
	};
};
