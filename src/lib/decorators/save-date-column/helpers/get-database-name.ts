import { SaveDateColumnOptions } from "../../types/column-options";

interface GetDatabaseNameParams {
	propertyName: string;
	options?: SaveDateColumnOptions;
}

export const getDatabaseName = ({
	propertyName,
	options,
}: GetDatabaseNameParams) => {
	const customName = (options as SaveDateColumnOptions)?.name;

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
