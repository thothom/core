import { PrimaryColumnOptions } from "../types/column-options";
import { getDatabaseName } from "./helpers/get-name";
import { getType } from "./helpers/get-type";
import { MetadataUtil } from "../../utils/metadata-util";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrimaryColumn = (
	nameOrOptions?: PrimaryColumnOptions | string,
) => {
	return (entityPrototype: any, propertyName: string) => {
		const { databaseName, isNameAlreadyFormatted } = getDatabaseName({
			propertyName,
			nameOrOptions,
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
				type,
				primary: true,
				extras: (nameOrOptions as PrimaryColumnOptions)?.extras,
			},
		});
	};
};
