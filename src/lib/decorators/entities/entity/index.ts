import { getOptions } from "../../@helpers/get-options";
import { EntityOptions } from "../../types/entity-options";
import { addEntityMetadata } from "../helpers/add-entity-metadata";
import { getDatabaseName } from "../helpers/get-name";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Entity = (nameOrOptions?: EntityOptions | string) => {
	return (entityConstructor: any) => {
		const { databaseName, isNameAlreadyFormatted } = getDatabaseName({
			entityConstructor,
			nameOrOptions,
		});

		const { extras } = getOptions<EntityOptions>(nameOrOptions);

		addEntityMetadata({
			entityConstructor,
			metadata: {
				name: entityConstructor.name,
				databaseName,
				isNameAlreadyFormatted,
				extras,
			},
		});
	};
};
