import { EntityMetadata, ColumnMetadata } from "./metadata";

export interface IncrementedEntitiesMetadata<
	EntityExtraMetadata,
	ColumnExtraMetadata,
> extends EntityMetadata<EntityExtraMetadata> {
	columns: Array<ColumnMetadata<ColumnExtraMetadata>>;
}

export type MetadataManagerEntities<EntityExtraMetadata, ColumnExtraMetadata> =
	Record<
		string, // Entity Class Name
		IncrementedEntitiesMetadata<EntityExtraMetadata, ColumnExtraMetadata>
	>;
