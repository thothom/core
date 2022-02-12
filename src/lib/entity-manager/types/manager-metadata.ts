import type { ColumnMetadata } from "./column-metadata";
import type { EntityMetadata } from "./entity-metadata";

import type { BaseExtraMetadata } from "../../types/extra-metadata";

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
