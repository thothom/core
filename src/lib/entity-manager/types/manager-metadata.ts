import { BaseExtraMetadata } from "../../types/extra-metadata";
import { ColumnMetadata } from "./column-metadata";
import { EntityMetadata } from "./entity-metadata";

export interface IncrementedEntitiesMetadata<
	ExtraMetadata extends BaseExtraMetadata = any,
> extends EntityMetadata<ExtraMetadata> {
	columns: Array<ColumnMetadata<ExtraMetadata["column"]>>;
}

export type EntityManagerEntities<
	ExtraMetadata extends BaseExtraMetadata = any,
> = Record<
	string, // Entity Class Name
	IncrementedEntitiesMetadata<ExtraMetadata>
>;
