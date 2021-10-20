import { getOptions } from "../helpers/get-options";
import { IndexOptions } from "../types/index-options";
import { addIndexMetadata } from "./helpers/add-index-metadata";
import { getIndexName } from "./helpers/get-index-name";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Index = <IndexExtraMetadata = any>(
	nameOrOptions?: IndexOptions<IndexExtraMetadata> | string,
) => {
	return (entityPrototype: any, propertyName: string) => {
		const { name, extras } =
			getOptions<IndexOptions<IndexExtraMetadata>>(nameOrOptions);

		const indexName = getIndexName({
			name,
			propertyName,
			nameOrOptions,
		});

		addIndexMetadata<IndexExtraMetadata>({
			entityConstructor: entityPrototype.constructor,
			columnName: propertyName,
			indexName,
			extras,
		});
	};
};
