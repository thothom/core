import { SymbiosisError } from "../../../error";
import { EntityMetadata } from "../../../entity-manager/types/entity-metadata";
import { MetadataUtil } from "../../../utils/metadata-util";

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
		throw new SymbiosisError({
			code: "MISSING_DECORATOR",
			message: "Entity must have at least one column",
			origin: "SYMBIOSIS",
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