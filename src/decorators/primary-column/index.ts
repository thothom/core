import { PrimaryColumnOptions } from "../types/column-options";
import { addColumnMetadata } from "../column/helpers/add-column-metadata";
import { getSemiFormattedName } from "./helpers/get-name";
import { getType } from "./helpers/get-type";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrimaryColumn = (
	nameOrOptions?: PrimaryColumnOptions | string,
) => {
	return (entityPrototype: any, propertyName: string) => {
		const formattedName = getSemiFormattedName({
			propertyName,
			nameOrOptions,
		});
		const type = getType({
			entityPrototype,
			propertyName,
		});

		addColumnMetadata({
			entity: entityPrototype,
			metadata: {
				name: propertyName,
				formattedName,
				type,
				primary: true,
				extras: (nameOrOptions as PrimaryColumnOptions).extras,
			},
		});
	};
};
