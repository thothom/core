import { EntityOptions } from "../types/entity-options";
import { addEntityMetadata } from "./helpers/add-entity-metadata";
import { getSemiFormattedName } from "./helpers/get-name";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Entity = (nameOrOptions?: EntityOptions | string) => {
	return (entityConstructor: any) => {
		const databaseName = getSemiFormattedName({
			entityConstructor,
			nameOrOptions,
		});

		addEntityMetadata({
			entityConstructor,
			metadata: {
				name: entityConstructor.name,
				databaseName,
				extras: (nameOrOptions as EntityOptions)?.extras,
			},
		});
	};
};
