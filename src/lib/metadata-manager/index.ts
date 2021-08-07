/* eslint-disable @typescript-eslint/no-explicit-any */

import { ConnectionMembers } from "../connection/types/connection-members";
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
			entities: connection.options.entities,
			namingPattern: connection.options.namingPattern,
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

	public getEntityMetadata(entity: any) {
		return this.entities[entity.name];
	}

	public getColumnMetadata(entity: any, columnName: string) {
		return this.entities[entity.name]?.columns.find(
			columnMetadata => columnMetadata.name === columnName,
		);
	}

	public getEntityPrimaryColumns(entity: any) {
		return this.entities[entity.name]?.columns.filter(
			columnMetadata => columnMetadata.primary,
		);
	}
}
