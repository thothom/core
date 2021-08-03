type PrimaryKeyTypes<Entity> = Date | Partial<Entity> | number | string;

export interface Repository<Entity> {
	save: (
		data: Array<Partial<Entity>> | Partial<Entity>,
	) => Promise<Array<Entity> | Entity>;
	findOneByPrimaryKey: (primaryKey: PrimaryKeyTypes<Entity>) => Promise<Entity>;
	findManyByPrimaryKey: (
		primaryKeys: Array<PrimaryKeyTypes<Entity>>,
	) => Promise<Array<Entity>>;
}
