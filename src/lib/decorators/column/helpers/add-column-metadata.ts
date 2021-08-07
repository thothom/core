import { ColumnMetadata } from "../../../metadata-manager/types/metadata";
import { MetadataUtil } from "../../../utils/metadata-util";

interface AddColumnMetadataParams {
	entity: any;
	metadata: ColumnMetadata<any>;
}

export const addColumnMetadata = ({
	entity,
	metadata,
}: AddColumnMetadataParams) => {
	const columns = (MetadataUtil.getEntityMetadata({
		metadataKey: "columns",
		entity,
	}) || []) as Array<ColumnMetadata>;

	MetadataUtil.defineEntityMetadata({
		entity,
		metadataKey: "columns",
		/**
		 * Puts the column metadata at the beginning,
		 * because decorators are executed in order
		 * LAST -> FIRST
		 */
		metadataValue: [metadata, ...columns],
	});
};
