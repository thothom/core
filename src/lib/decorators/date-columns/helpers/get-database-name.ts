import { DateColumnOptions } from "../../types/column-options";

interface GetDatabaseNameParams {
	propertyName: string;
	options?: DateColumnOptions;
}

export const getDatabaseName = ({
	propertyName,
	options,
}: GetDatabaseNameParams) => {
	const customName = (options as DateColumnOptions)?.name;

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
