import { MetadataType } from "./metadata-type";

export interface EntityMetadata<
	EntityExtraMetadata = Record<string, any>,
	ColumnExtraMetadata = Record<string, any>,
> {
	name: string;
	databaseName: string;
	columns: Array<ColumnMetadata<ColumnExtraMetadata>>;
	extras?: EntityExtraMetadata;
	/**
	 * When a new metadata is added, remember to also
	 * add at the const ENTITY_METADATA_KEYS
	 */
}

export const ENTITY_METADATA_KEYS = [
	"name",
	"databaseName",
	"columns",
	"extras",
] as Array<keyof EntityMetadata>;

export interface ColumnMetadata<ExtraData = Record<string, any>> {
	name: string;
	databaseName: string;
	type: MetadataType;
	isArray?: boolean;
	primary?: true;
	extras?: ExtraData;
	/**
	 * When a new metadata is added, remember to also
	 * add at the const COLUMN_METADATA_KEYS
	 */
}

export const COLUMN_METADATA_KEYS = [
	"name",
	"databaseName",
	"type",
	"isArray",
	"primary",
	"extras",
] as Array<keyof ColumnMetadata>;
