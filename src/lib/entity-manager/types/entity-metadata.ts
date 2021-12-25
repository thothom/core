import { ColumnMetadata } from "./column-metadata";

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

	"indexes",
	"extras",
];
