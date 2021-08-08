import { ColumnMetadata } from "../../../entity-manager/types/metadata";
import { MetadataUtil } from "../../../utils/metadata-util";

interface AddColumnMetadataParams {
	entityPrototype: any;
	metadata: ColumnMetadata<any>;
}

export const addColumnMetadata = ({
	entityPrototype,
	metadata,
}: AddColumnMetadataParams) => {
	const entity = entityPrototype.constructor;

	const columns = (MetadataUtil.getEntityMetadata({
		metadataKey: "columns",
		entity,
	}) || []) as Array<ColumnMetadata>;

	MetadataUtil.defineEntityMetadata({
		entity,
		metadataKey: "columns",
		metadataValue: [...columns, metadata],
	});
};
