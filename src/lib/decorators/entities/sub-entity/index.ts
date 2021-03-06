import { getOptions } from "../../@helpers/get-options";
import { addEntityMetadata } from "../helpers/add-entity-metadata";

import type { SubEntityOptions } from "../../types/entity-options";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SubEntity = (options?: SubEntityOptions) => {
	return (entityConstructor: any) => {
		const { extras } = getOptions<SubEntityOptions>(options);

		addEntityMetadata({
			entityConstructor,
			metadata: {
				name: entityConstructor.name,
				databaseName: entityConstructor.name,
				isNameAlreadyFormatted: true,
				isSubEntity: true,
				extras,
			},
		});
	};
};
