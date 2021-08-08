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
		return nameOrOptions;
	}

	if (nameOrOptions?.name) {
		return nameOrOptions.name;
	}

	return entityConstructor.name;
};
