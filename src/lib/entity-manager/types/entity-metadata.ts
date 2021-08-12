import { ColumnMetadata } from "./column-metadata";

export interface EntityMetadata<
	EntityExtraMetadata = Record<string, any>,
	ColumnExtraMetadata = Record<string, any>,
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
	"isSubEntity",
	"isNameAlreadyFormatted",
	"columns",
	"extras",
];
