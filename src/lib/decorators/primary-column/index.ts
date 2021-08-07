import { PrimaryColumnOptions } from "../types/column-options";
import { addColumnMetadata } from "../column/helpers/add-column-metadata";
import { getDatabaseName } from "./helpers/get-name";
import { getType } from "./helpers/get-type";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrimaryColumn = (
	nameOrOptions?: PrimaryColumnOptions | string,
) => {
	return (entityPrototype: any, propertyName: string) => {
		const databaseName = getDatabaseName({
			propertyName,
			nameOrOptions,
		});
		const type = getType({
			entityPrototype,
			propertyName,
		});

		addColumnMetadata({
			entityPrototype,
			metadata: {
				name: propertyName,
				databaseName,
				type,
				primary: true,
				extras: (nameOrOptions as PrimaryColumnOptions)?.extras,
			},
		});
	};
};
