import { ColumnMetadata } from "./column-metadata";

export interface RelationMap {
	columnName: string;
	targetColumnName: string;
	foreignKeyEntity: "current" | "target";
}

export interface Relation {
	type: "MANY_TO_MANY" | "MANY_TO_ONE" | "ONE_TO_MANY" | "ONE_TO_ONE";
	/**
	 * Target entity for the relation
	 */
	targetEntity: any;
	/**
	 * A map between the relations fields
	 * of both entities
	 */
	relationMap: Array<RelationMap>;
	/**
	 * Column to load the relation data
	 *
	 * Like "name" in ColumnMetadata
	 */
	relationColumn: string;
	extras?: any;
}

export interface EntityMetadata<
	EntityExtraMetadata = any,
	ColumnExtraMetadata = any,
	IndexExtraMetadata = any,
> {
	/**
	 * ----------------------------------------------
	 * When a new metadata is added, remember to also
	 * add at the const ENTITY_METADATA_KEYS
	 * ----------------------------------------------
	 */
	name: string;
	databaseName: string;
	isNameAlreadyFormatted?: boolean;

	isSubEntity?: boolean;

	columns: Array<ColumnMetadata<ColumnExtraMetadata>>;

	relations?: Array<Relation>;

	indexes?: Array<{
		databaseName: string;
		columns: Array<{
			name: string;
			extras: IndexExtraMetadata;
		}>;
	}>;

	extras?: EntityExtraMetadata;
	/**
	 * ----------------------------------------------
	 * When a new metadata is added, remember to also
	 * add at the const ENTITY_METADATA_KEYS
	 * ----------------------------------------------
	 */
}

export const ENTITY_METADATA_KEYS: Array<keyof EntityMetadata> = [
	"name",
	"databaseName",
	"isNameAlreadyFormatted",

	"isSubEntity",

	"columns",

	"relations",

	"indexes",
	"extras",
];
