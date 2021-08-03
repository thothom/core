import { EntityOptions } from "../../types/entity-options";

interface GetNameParams {
	target: any;
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
