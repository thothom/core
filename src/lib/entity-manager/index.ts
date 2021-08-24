/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseConnectionOptions } from "../connection/types/connection-options";
import { CompassError } from "../error";
import { CompassErrorCodeEnum } from "../error/types/error-code.enum";
import { Logger } from "../logger";
import {
	autoGenerateEntityToDatabase,
	AutoGenerateEntityToDatabaseParams,
} from "./methods/auto-generate-entity-to-database";
import {
	convertDatabaseToEntity,
	ConvertDatabaseToEntityParams,
} from "./methods/convert-database-to-entity";
import {
	convertEntityToDatabase,
	ConvertEntityToDatabaseParams,
} from "./methods/convert-entity-to-database";
import { loadEntities } from "./methods/load-entities";
import { EntityManagerEntities } from "./types/manager-metadata";

interface EntityManagerConstructorParams {
	connectionOptions: BaseConnectionOptions;
	logger: Logger;
}

/**
 * Responsible of store and manage all entities metadata
 * for a specific connection.
 */
export class EntityManager<EntityExtraMetadata, ColumnExtraMetadata> {
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
	private readonly entities: EntityManagerEntities<
		EntityExtraMetadata,
		ColumnExtraMetadata
	> = {};

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
	}: EntityManagerConstructorParams) {
		this.logger = logger;
		this.connectionOptions = connectionOptions;

		const entities = loadEntities<EntityExtraMetadata, ColumnExtraMetadata>({
			connectionOptions: this.connectionOptions,
			logger: this.logger,
			entities: this.connectionOptions.entities,
		});

		this.entities = entities;
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
			throw new CompassError({
				message: "Entity not Registered",
				code: CompassErrorCodeEnum.ENTITY_ERROR,
				origin: "COMPASS",
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
			throw new CompassError({
				message: "Column not found",
				code: CompassErrorCodeEnum.COLUMN_ERROR,
				origin: "COMPASS",
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
	 */
	public autoGenerateEntityToDatabase(
		params: AutoGenerateEntityToDatabaseParams,
	): Record<string, any> {
		return autoGenerateEntityToDatabase(
			{
				metadataManager: this,
				connectionOptions: this.connectionOptions,
			},
			params,
		);
	}

	/**
	 * Converts an entity data to database data
	 */
	public convertEntityToDatabase(
		params: ConvertEntityToDatabaseParams,
	): Record<string, any> {
		return convertEntityToDatabase({ metadataManager: this }, params);
	}

	/**
	 * Converts database data to an entity data
	 */
	public convertDatabaseToEntity(
		params: ConvertDatabaseToEntityParams,
	): Record<string, any> {
		return convertDatabaseToEntity({ metadataManager: this }, params);
	}
}
