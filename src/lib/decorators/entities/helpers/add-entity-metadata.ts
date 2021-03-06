import { ThothError } from "../../../error";

import { MetadataUtil } from "../../../utils/metadata-util";

import type { EntityMetadata } from "../../../entity-manager/types/entity-metadata";

interface AddEntityMetadataParams {
	entityConstructor: any;
	metadata: Omit<EntityMetadata, "columns">;
}

export const addEntityMetadata = ({
	entityConstructor,
	metadata,
}: AddEntityMetadataParams) => {
	const columns = MetadataUtil.getEntityMetadata({
		metadataKey: "columns",
		entity: entityConstructor,
	});

	if (!columns) {
		throw new ThothError({
			code: "MISSING_DECORATOR",
			message: "Entity must have at least one column",
			origin: "THOTHOM",
			details: [`Entity: ${entityConstructor.name}`],
		});
	}

	MetadataUtil.defineAllEntityMetadata({
		entity: entityConstructor,
		metadata: {
			...metadata,
			columns,
		},
	});
};
