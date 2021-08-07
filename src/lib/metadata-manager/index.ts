/* eslint-disable @typescript-eslint/no-explicit-any */

import { Connection } from "../connection";
import { CompassError } from "../error";
import { CompassErrorCodeEnum } from "../error/types/error-code.enum";
import { setEntitiesMetadata } from "./helpers/set-entities-metadata";
import { setSubEntitiesMetadata } from "./helpers/set-sub-entities-metadata";
import {
	convertEntityToDatabase,
	ConvertEntityToDatabaseParams,
} from "./methods/convert-entity-to-database";
import { MetadataManagerEntities } from "./types/manager-metadata";

export class MetadataManager<EntityExtraMetadata, ColumnExtraMetadata> {
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
	private readonly entities: MetadataManagerEntities<
		EntityExtraMetadata,
		ColumnExtraMetadata
	> = {};

	/**
	 * Saves the metadata of all sub-entities
	 *
	 * Follows the same format that the entities property
	 */
	private readonly subEntities: MetadataManagerEntities<
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

	public constructor(
		connection: Connection<EntityExtraMetadata, ColumnExtraMetadata>,
	) {
		setEntitiesMetadata<EntityExtraMetadata, ColumnExtraMetadata>({
			entities: this.entities,
			logger: connection.logger,
			rawEntities: connection.options.entities,
			connectionOptions: connection.options,
		});

		const allEntitiesColumns = Object.values(this.entities)
			.map(entity => entity.columns)
			.flat();

		setSubEntitiesMetadata<EntityExtraMetadata, ColumnExtraMetadata>({
			allEntitiesColumns,
			subEntities: this.subEntities,
			logger: connection.logger,
			connectionOptions: connection.options,
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

	public getAllSubEntitiesMetadata() {
		return this.subEntities;
	}

	public getAllEntitiesDatabaseNames() {
		return Object.values(this.entities).map(entity => entity.databaseName);
	}

	public getEntityMetadata(entity: any) {
		const entityMetadata = this.entities[entity.name];

		if (!entityMetadata) {
			throw new CompassError({
				message: "Entity not Registered!",
				code: CompassErrorCodeEnum.ENTITY_ERROR,
				origin: "COMPASS",
				details: ["Entity: ", entity],
			});
		}

		return entityMetadata;
	}

	public getSubEntityMetadata(subEntity: any) {
		const subEntityMetadata = this.subEntities[subEntity.name];

		if (!subEntityMetadata) {
			throw new CompassError({
				message: "SubEntity not Registered!",
				code: CompassErrorCodeEnum.ENTITY_ERROR,
				origin: "COMPASS",
				details: ["SubEntity: ", subEntity],
			});
		}

		return subEntityMetadata;
	}

	public getColumnMetadata(entity: any, columnName: string) {
		const columnMetadata = this.entities[entity.name]?.columns.find(
			metadata => metadata.name === columnName,
		);

		if (!columnMetadata) {
			throw new CompassError({
				message: "Entity not Registered!",
				code: CompassErrorCodeEnum.COLUMN_ERROR,
				origin: "COMPASS",
				details: ["Entity: ", entity, "Column: ", columnName],
			});
		}

		return columnMetadata;
	}

	public getEntityPrimaryColumns(entity: any) {
		return this.entities[entity.name]?.columns.filter(
			columnMetadata => columnMetadata.primary,
		);
	}

	public convertEntityToDatabase(
		params: ConvertEntityToDatabaseParams,
	): Record<string, any> {
		return convertEntityToDatabase({ metadataManager: this }, params);
	}
}
