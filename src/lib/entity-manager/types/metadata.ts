import { MetadataType } from "./metadata-type";

export interface EntityMetadata<
	EntityExtraMetadata = Record<string, any>,
	ColumnExtraMetadata = Record<string, any>,
> {
	/**
	 * When a new metadata is added, remember to also
	 * add at the const ENTITY_METADATA_KEYS
	 */
	name: string;
	databaseName: string;
	isSubEntity?: boolean;
	isNameAlreadyFormatted?: boolean;
	columns: Array<ColumnMetadata<ColumnExtraMetadata>>;
	extras?: EntityExtraMetadata;
	/**
	 * When a new metadata is added, remember to also
	 * add at the const ENTITY_METADATA_KEYS
	 */
}

export const ENTITY_METADATA_KEYS: Array<keyof EntityMetadata> = [
	"name",
	"databaseName",
	"isSubEntity",
	"isNameAlreadyFormatted",
	"columns",
	"extras",
];

export interface ColumnMetadata<ExtraData = Record<string, any>> {
	/**
	 * When a new metadata is added, remember to also
	 * add at the const COLUMN_METADATA_KEYS
	 */
	name: string;
	databaseName: string;
	type: MetadataType;
	isNameAlreadyFormatted?: boolean;
	isArray?: boolean;
	primary?: boolean;
	extras?: ExtraData;
	/**
	 * When a new metadata is added, remember to also
	 * add at the const COLUMN_METADATA_KEYS
	 */
}

export const COLUMN_METADATA_KEYS: Array<keyof ColumnMetadata> = [
	"name",
	"databaseName",
	"type",
	"isNameAlreadyFormatted",
	"isArray",
	"primary",
	"extras",
];
