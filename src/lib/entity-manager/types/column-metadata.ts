import { BaseConnectionOptions } from "../../connection/types/connection-options";
import { DatabaseEvents } from "./database-events";
import { MetadataType } from "./metadata-type";
import { EntityMetadata } from "./entity-metadata";

type AutoGenerationFunc = (p: {
	connectionOptions?: BaseConnectionOptions;
	columnMetadata?: ColumnMetadata;
	entityMetadata?: EntityMetadata;
	data?: Record<string, any>;
}) => any;

export type PreDefinedAutoGenerationMethods = "date" | "uuid";

export interface ColumnMetadata<ExtraData = Record<string, any>> {
	/**
	 * ----------------------------------------------
	 * When a new metadata is added, remember to also
	 * add at the const COLUMN_METADATA_KEYS
	 * ----------------------------------------------
	 */
	name: string;
	databaseName: string;
	isNameAlreadyFormatted?: boolean;

	comment?: string;

	type: MetadataType;
	databaseType?: string;
	isArray?: boolean;

	enumName?: string;
	enumValues?: Array<number | string>;

	autoGenerate?: AutoGenerationFunc | PreDefinedAutoGenerationMethods | any;
	autoGenerateOnlyOnEvents?: Array<DatabaseEvents>;

	primary?: boolean;

	extras?: ExtraData;
	/**
	 * ----------------------------------------------
	 * When a new metadata is added, remember to also
	 * add at the const COLUMN_METADATA_KEYS
	 * ----------------------------------------------
	 */
}

export const COLUMN_METADATA_KEYS: Array<keyof ColumnMetadata> = [
	"name",
	"databaseName",
	"isNameAlreadyFormatted",

	"comment",

	"type",
	"databaseType",
	"isArray",

	"enumName",
	"enumValues",

	"autoGenerate",
	"autoGenerateOnlyOnEvents",

	"primary",

	"extras",
];
