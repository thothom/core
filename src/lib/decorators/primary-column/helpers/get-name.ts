import { PrimaryColumnOptions } from "../../types/column-options";

interface GetNameParams {
	propertyName: string;
	nameOrOptions?: PrimaryColumnOptions | string;
}

export const getDatabaseName = ({
	propertyName,
	nameOrOptions,
}: GetNameParams) => {
	if (typeof nameOrOptions === "string") {
		return {
			databaseName: nameOrOptions,
			isNameAlreadyFormatted: true,
		};
	}

	const customName = (nameOrOptions as PrimaryColumnOptions)?.name;

	if (customName) {
		return {
			databaseName: customName,
			isNameAlreadyFormatted: true,
		};
	}

	return {
		databaseName: propertyName,
	};
};
