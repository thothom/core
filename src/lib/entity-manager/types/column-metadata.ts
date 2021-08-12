import { BaseConnectionOptions } from "../../connection/types/connection-options";
import { DatabaseEvents } from "./database-events";
import { MetadataType } from "./metadata-type";

type AutoGenerateEntityToDatabaseFunc = (
	connectionOptions?: BaseConnectionOptions,
) => any;

type AutoGenerateDatabaseToEntityFunc = (
	entity?: any,
	connectionOptions?: BaseConnectionOptions,
) => any;

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

	type: MetadataType;

	/**
	 * Besides it receives an entity as param, the entity must ONLY
	 * be passed as param when autoGenerationType is DATABASE_TO_CODE
	 */
	autoGenerate?:
		| AutoGenerateDatabaseToEntityFunc
		| AutoGenerateEntityToDatabaseFunc;
	isAutoGenerated?: boolean;
	autoGenerationType?: "DATABASE_TO_ENTITY" | "ENTITY_TO_DATABASE";
	autoGenerateOnlyOnEvents?: Array<DatabaseEvents>;

	isArray?: boolean;

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
	"type",
	"isNameAlreadyFormatted",
	"autoGenerate",
	"isAutoGenerated",
	"autoGenerationType",
	"autoGenerateOnlyOnEvents",
	"isArray",
	"primary",
	"extras",
];