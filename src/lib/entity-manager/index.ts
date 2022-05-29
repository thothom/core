/* eslint-disable @typescript-eslint/no-explicit-any */

import { ThothError } from "../error";
import type { Logger } from "../logger";

import type { AutoGenerateEntityToDatabaseParams } from "./methods/auto-generate-entity-to-database";
import { autoGenerateEntityToDatabase } from "./methods/auto-generate-entity-to-database";
import type { ConvertColumnsNamesParams } from "./methods/convert-columns-names";
import { convertColumnsNames } from "./methods/convert-columns-names";
import type { ConvertDatabaseToEntityParams } from "./methods/convert-database-to-entity";
import { convertDatabaseToEntity } from "./methods/convert-database-to-entity";
import type { ConvertEntityToDatabaseParams } from "./methods/convert-entity-to-database";
import { convertEntityToDatabase } from "./methods/convert-entity-to-database";
import type { FormatConditionsParams } from "./methods/format-conditions";
import { formatConditions } from "./methods/format-conditions";
import type { FormatOrderParams } from "./methods/format-order";
import { formatOrder } from "./methods/format-order";
import { loadEntities } from "./methods/load-entities";

import type { BaseConnectionOptions } from "../connection/types/connection-options";
import type { DatabaseEntity } from "../types/database-entity";
import type { BaseExtraMetadata } from "../types/extra-metadata";
import type { EntityManagerEntities } from "./types/manager-metadata";

interface EntityManagerConstructorParams {
	connectionOptions: BaseConnectionOptions;
	logger: Logger;
	entities: Array<any>;
}

/**
 * Responsible of store and manage all entities metadata
 * for a specific connection.
 */
export class EntityManager<ExtraMetadata extends BaseExtraMetadata = any> {
	/**
	 * Logger
	 */
	private readonly logger: Logger;

	/**
	 * Connection Options
	 */
	private readonly connectionOptions: BaseConnectionOptions;

	/**
	 * Saves the metadata of all the entities, columns, etc
	 *
	 * Format:
	 * ```
	 * 	{
	 * 		[Entity Class Name]: {
	 * 			...[Entity Metadata Here]
	 * 			column: [
	 * 				...[Array Of Columns Metadata]
	 * 			]
	 * 		}
	 * 	}
	 * ```
	 */
	public readonly entities: EntityManagerEntities<ExtraMetadata> = {};

	/**
	 * ---------------------------------------------------
	 *
	 * Constructor
	 *
	 * ---------------------------------------------------
	 */

	public constructor({
		connectionOptions,
		logger,
		entities,
	}: EntityManagerConstructorParams) {
		this.logger = logger;
		this.connectionOptions = connectionOptions;

		this.entities = loadEntities<ExtraMetadata>({
			connectionOptions: this.connectionOptions,
			logger: this.logger,
			entities,
		});
	}

	/**
	 * ---------------------------------------------------
	 *
	 * Getters
	 *
	 * ---------------------------------------------------
	 */

	public getAllEntitiesMetadata() {
		return this.entities;
	}

	/**
	 * Returns ONLY the entities that AREN'T SubEntities
	 */
	public getAllTablesMetadata() {
		return Object.values(this.entities).filter(
			entityMetadata => !entityMetadata.isSubEntity,
		);
	}

	public getEntityMetadata(entity: any) {
		const entityMetadata = this.entities[entity.name];

		if (!entityMetadata) {
			throw new ThothError({
				message: "Entity not Registered",
				code: "ENTITY_ERROR",
				origin: "THOTHOM",
				details: ["Entity: ", entity],
			});
		}

		return entityMetadata;
	}

	public getColumnMetadata(entity: any, columnName: string) {
		const entityMetadata = this.getEntityMetadata(entity);

		const columnMetadata = entityMetadata.columns.find(
			metadata => metadata.name === columnName,
		);

		if (!columnMetadata) {
			throw new ThothError({
				message: "Column not found",
				code: "COLUMN_ERROR",
				origin: "THOTHOM",
				details: ["Entity: ", entity, "Column: ", columnName],
			});
		}

		return columnMetadata;
	}

	public getEntityPrimaryColumns(entity: any) {
		const entityMetadata = this.getEntityMetadata(entity);

		return entityMetadata.columns.filter(
			columnMetadata => columnMetadata.primary,
		);
	}

	/**
	 * Auto Generate Fields (Entity -> Database)
	 *
	 * AutoGenerate Columns Fields **BEFORE** the data
	 * be formatted to the database pattern
	 */
	public autoGenerateEntityToDatabase<Entity>(
		params: AutoGenerateEntityToDatabaseParams<Entity>,
	): Entity {
		return autoGenerateEntityToDatabase(
			{
				entityManager: this,
				connectionOptions: this.connectionOptions,
			},
			params,
		);
	}

	/**
	 * Converts an entity data to database data
	 *
	 * This must be called **AFTER** the
	 * `autoGenerateEntityToDatabase` method
	 */
	public convertEntityToDatabase(
		params: ConvertEntityToDatabaseParams,
	): DatabaseEntity {
		return convertEntityToDatabase({ entityManager: this }, params);
	}

	/**
	 * Converts database data to an entity data
	 */
	public convertDatabaseToEntity<Entity>(
		params: ConvertDatabaseToEntityParams,
	): Entity | undefined {
		return convertDatabaseToEntity<Entity>({ entityManager: this }, params);
	}

	/**
	 * Format conditions to the database style
	 */
	public formatConditions(
		params: FormatConditionsParams,
	): FormatConditionsParams["conditions"] {
		return formatConditions({ entityManager: this }, params);
	}

	/**
	 * Format "order" to the database style
	 */
	public formatOrder(params: FormatOrderParams): FormatOrderParams["orderBy"] {
		return formatOrder({ entityManager: this }, params);
	}

	/**
	 * Format convert array columns names to the database style
	 */
	public convertColumnsNames(params: ConvertColumnsNamesParams): Array<string> {
		return convertColumnsNames({ entityManager: this }, params);
	}
}
