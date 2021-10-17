import { getOptions } from "../helpers/get-options";
import { EntityOptions } from "../types/entity-options";
import { addEntityMetadata } from "./helpers/add-entity-metadata";
import { getDatabaseName } from "./helpers/get-name";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Entity = (nameOrOptions?: EntityOptions | string) => {
	return (entityConstructor: any) => {
		const { databaseName, isNameAlreadyFormatted } = getDatabaseName({
			entityConstructor,
			nameOrOptions,
		});

		const { isSubEntity, extras } = getOptions<EntityOptions>(nameOrOptions);

		/**
		 * "Fix" the tipping, so it doesn't need
		 * to be done multiple times
		 *
		 * **Obs:** Besides the type is defined as "EntityOptions | undefined",
		 * it also can be a string, so be aware!
		 */

		addEntityMetadata({
			entityConstructor,
			metadata: {
				name: entityConstructor.name,
				databaseName,
				isNameAlreadyFormatted,
				isSubEntity,
				extras,
			},
		});
	};
};
