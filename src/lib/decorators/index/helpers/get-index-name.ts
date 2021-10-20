import { getTypeof } from "@techmmunity/utils";
import { snakeCase } from "snake-case";
import { IndexOptions } from "../../types/index-options";

interface GetIndexNameParams {
	name?: string;
	propertyName: string;
	nameOrOptions?: IndexOptions | string;
}

export const getIndexName = ({
	name,
	nameOrOptions,
	propertyName,
}: GetIndexNameParams) => {
	if (name) return name;

	if (getTypeof(nameOrOptions) === "string") return nameOrOptions as string;

	return `${snakeCase(propertyName)}_index`;
};
