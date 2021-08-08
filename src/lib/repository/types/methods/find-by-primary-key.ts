type PrimaryKeyTypes<Entity> = Date | Partial<Entity> | number | string;

export type FindOneByPrimaryKey<Entity> = (
	primaryKey: PrimaryKeyTypes<Entity>,
) => Promise<Entity>;

export type FindManyByPrimaryKey<Entity> = (
	primaryKeys: Array<PrimaryKeyTypes<Entity>>,
) => Promise<Array<Entity>>;
