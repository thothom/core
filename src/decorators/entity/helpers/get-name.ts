import { BaseClass } from "../../../types/class";
import { EntityOptions } from "../../../types/options/entity-options";

interface GetNameParams {
	target: BaseClass;
	nameOrOptions?: EntityOptions | string;
}

export const getName = ({ target, nameOrOptions }: GetNameParams) => {
	if (typeof nameOrOptions === "string") {
		return nameOrOptions;
	}

	if (typeof nameOrOptions?.name === "string") {
		return nameOrOptions?.name;
	}

	return target.constructor.name;
};
