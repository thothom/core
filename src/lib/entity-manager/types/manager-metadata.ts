import { ColumnMetadata } from "./column-metadata";
import { EntityMetadata } from "./entity-metadata";

export interface IncrementedEntitiesMetadata<
	EntityExtraMetadata,
	ColumnExtraMetadata,
> extends EntityMetadata<EntityExtraMetadata> {
	columns: Array<ColumnMetadata<ColumnExtraMetadata>>;
}

export type EntityManagerEntities<EntityExtraMetadata, ColumnExtraMetadata> =
	Record<
		string, // Entity Class Name
		IncrementedEntitiesMetadata<EntityExtraMetadata, ColumnExtraMetadata>
	>;
