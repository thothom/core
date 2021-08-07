import { MetadataType } from "../../../metadata-manager/types/metadata-type";
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
		return propertyName;
	}

	return (typeOrOptions as ColumnOptions)?.name || propertyName;
};
