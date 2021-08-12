import { PrimaryGeneratedColumnStrategy } from "..";
import { PrimaryGeneratedColumnOptions } from "../../types/column-options";

interface GetDatabaseNameParams {
	propertyName: string;
	strategyOrOptions?:
		| PrimaryGeneratedColumnOptions
		| PrimaryGeneratedColumnStrategy;
}

export const getDatabaseName = ({
	propertyName,
	strategyOrOptions,
}: GetDatabaseNameParams) => {
	const customName = (strategyOrOptions as PrimaryGeneratedColumnOptions)?.name;

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
