import { ColumnMetadata } from "./column-metadata";
import { EntityMetadata } from "./entity-metadata";

export interface IncrementedEntitiesMetadata<
	EntityExtraMetadata,
	ColumnExtraMetadata,
	IndexExtraMetadata,
> extends EntityMetadata<
		EntityExtraMetadata,
		ColumnExtraMetadata,
		IndexExtraMetadata
	> {
	columns: Array<ColumnMetadata<ColumnExtraMetadata>>;
}

export type EntityManagerEntities<
	EntityExtraMetadata,
	ColumnExtraMetadata,
	IndexExtraMetadata,
> = Record<
	string, // Entity Class Name
	IncrementedEntitiesMetadata<
		EntityExtraMetadata,
		ColumnExtraMetadata,
		IndexExtraMetadata
	>
>;
