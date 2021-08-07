/* eslint-disable @typescript-eslint/no-explicit-any */

import { ConnectionMembers } from "../connection/types/connection-members";
import { CompassError } from "../error";
import { CompassErrorCodeEnum } from "../error/types/error-code.enum";
import { getEntitiesMetadata } from "./helpers/get-entities-metadata";
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
	>;

	/**
	 * ---------------------------------------------------
	 *
	 * Constructor
	 *
	 * ---------------------------------------------------
	 */

	public constructor(
		connection: ConnectionMembers<EntityExtraMetadata, ColumnExtraMetadata>,
	) {
		this.entities = getEntitiesMetadata<
			EntityExtraMetadata,
			ColumnExtraMetadata
		>({
			logger: connection.logger,
			entities: connection.options.entities,
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
}
