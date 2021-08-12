import { PrimaryColumnOptions } from "../../types/column-options";

interface GetDatabaseNameParams {
	propertyName: string;
	nameOrOptions?: PrimaryColumnOptions | string;
}

export const getDatabaseName = ({
	propertyName,
	nameOrOptions,
}: GetDatabaseNameParams) => {
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
