interface EntityData {
	/**
	 * Plural, because composite primary keys exist
	 */
	primaryKeys: Array<string>;
	/**
	 * Plural, because composite secondary keys exist (maybe?)
	 */
	secondaryKeys: Array<string>;
}

class MetadataManager {
	/**
	 * Saves the data of an entity
	 */
	private readonly entities: Record<string, EntityData> = {};

	/**
	 * -----------------------------------------------------
	 *
	 * Setters
	 *
	 * -----------------------------------------------------
	 */

	/**
	 *
	 * Entities
	 *
	 */

	public addEntity(entity: any, baseValues: Partial<EntityData> = {}) {
		if (this.entities[entity.name]) {
			return;
		}

		this.entities[entity.name] = {
			primaryKeys: [],
			secondaryKeys: [],
			...baseValues,
		};
	}

	public addEntityPrimaryKey(entity: any, key: string) {
		if (this.entities[entity.name]) {
			// If the column is being registered for the second time
			if (this.entities[entity.name].primaryKeys.includes(key)) {
				return;
			}

			this.entities[entity.name].primaryKeys.push(key);

			return;
		}

		this.addEntity(entity, {
			primaryKeys: [key],
		});
	}

	public addEntitySecondaryKey(entity: any, key: string) {
		if (this.entities[entity.name]) {
			// If the column is being registered for the second time
			if (this.entities[entity.name].secondaryKeys.includes(key)) {
				return;
			}

			this.entities[entity.name].secondaryKeys.push(key);

			return;
		}

		this.addEntity(entity, {
			secondaryKeys: [key],
		});
	}

	/**
	 * -----------------------------------------------------
	 *
	 * Getters
	 *
	 * -----------------------------------------------------
	 */

	/**
	 *
	 * Entities
	 *
	 */

	public getEntityData(entity: any) {
		return this.entities[entity.name];
	}

	public getAllEntitiesData() {
		return this.entities;
	}

	public getEntityPrimaryKeys(entity: any) {
		return this.entities[entity.name]?.primaryKeys || [];
	}

	public getEntitySecondaryKeys(entity: any) {
		return this.entities[entity.name]?.secondaryKeys || [];
	}
}

export const metadataManager = new MetadataManager();
