import { PrimaryColumnOptions } from "../../types/column-options";

interface GetNameParams {
	propertyName: string;
	nameOrOptions?: PrimaryColumnOptions | string;
}

export const getName = ({ propertyName, nameOrOptions }: GetNameParams) => {
	if (typeof nameOrOptions === "string") {
		return nameOrOptions;
	}

	return (nameOrOptions as PrimaryColumnOptions)?.name || propertyName;
};
