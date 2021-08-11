import { MetadataType } from "../../../entity-manager/types/metadata-type";
import { ColumnOptions } from "../../types/column-options";

interface GetNameParams {
	propertyName: string;
	typeOrOptions?: ColumnOptions | MetadataType;
}

export const getSemiFormattedName = ({
	propertyName,
	typeOrOptions,
}: GetNameParams) => {
	if (typeof typeOrOptions === "function") {
		return {
			databaseName: propertyName,
		};
	}

	const customName = (typeOrOptions as ColumnOptions)?.name;

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
