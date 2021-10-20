import { MetadataUtil } from "../../../utils/metadata-util";

interface AddEntityMetadataParams<IndexExtraMetadata> {
	entityConstructor: any;
	indexName: string;
	columnName: string;
	extras?: IndexExtraMetadata;
}

export const addIndexMetadata = <IndexExtraMetadata>({
	entityConstructor,
	indexName,
	columnName,
	extras,
}: AddEntityMetadataParams<IndexExtraMetadata>) => {
	const entityMetadata = MetadataUtil.getAllEntityMetadata({
		entity: entityConstructor,
	});

	if (entityMetadata.indexes) {
		const sameIndex = entityMetadata.indexes.find(
			idx => idx.databaseName === indexName,
		);

		if (sameIndex) {
			sameIndex.columns.push({
				name: columnName,
				extras,
			});
		} else {
			entityMetadata.indexes.push({
				databaseName: indexName,
				columns: [
					{
						name: columnName,
						extras,
					},
				],
			});
		}
	} else {
		entityMetadata.indexes = [
			{
				databaseName: indexName,
				columns: [
					{
						name: columnName,
						extras,
					},
				],
			},
		];
	}

	MetadataUtil.defineAllEntityMetadata({
		entity: entityConstructor,
		metadata: entityMetadata,
	});
};
