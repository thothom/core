import { EntityOptions } from "../../types/entity-options";

interface GetNameParams {
	entityConstructor: any;
	nameOrOptions?: EntityOptions | string;
}

export const getDatabaseName = ({
	entityConstructor,
	nameOrOptions,
}: GetNameParams) => {
	if (typeof nameOrOptions === "string") {
		return {
			databaseName: nameOrOptions,
			isNameAlreadyFormatted: true,
		};
	}

	if (nameOrOptions?.name) {
		return {
			databaseName: nameOrOptions.name,
			isNameAlreadyFormatted: true,
		};
	}

	return {
		databaseName: entityConstructor.name,
	};
};
