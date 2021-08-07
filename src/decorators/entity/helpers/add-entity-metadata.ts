import { EntityMetadata } from "../../../metadata-manager/types/metadata";
import { MetadataUtil } from "../../../utils/metadata-util";

interface AddEntityMetadataParams {
	entity: any;
	metadata: EntityMetadata<any>;
}

export const addEntityMetadata = ({
	entity,
	metadata,
}: AddEntityMetadataParams) => {
	const columns = MetadataUtil.getEntityMetadata({
		metadataKey: "columns",
		entity,
	});

	MetadataUtil.defineAllEntityMetadata({
		entity,
		metadata: {
			...metadata,
			columns: columns || [],
		},
	});
};
