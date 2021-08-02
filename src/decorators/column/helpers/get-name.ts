import { ColumnOptions } from "../../types/column-options";
import { MetadataType } from "../../../utils/metadata/is-metadata-type";

interface GetNameParams {
	propertyName: string;
	typeOrOptions?: ColumnOptions | MetadataType;
}

export const getName = ({ propertyName, typeOrOptions }: GetNameParams) => {
	if (typeof typeOrOptions === "function") {
		return propertyName;
	}

	return (typeOrOptions as ColumnOptions)?.name || propertyName;
};
