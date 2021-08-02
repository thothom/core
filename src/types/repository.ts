import { BaseClass } from "./class";

type PrimaryKeyTypes<Entity> = Date | Partial<Entity> | number | string;

export interface Repository<Entity> {
	constructor: (connection: BaseClass, entity: Entity) => void;
	save: (
		data: Array<Partial<Entity>> | Partial<Entity>,
	) => Promise<Array<Entity> | Entity>;
	findOneByPrimaryKey: (primaryKey: PrimaryKeyTypes<Entity>) => Promise<Entity>;
	findManyByPrimaryKey: (
		primaryKeys: Array<PrimaryKeyTypes<Entity>>,
	) => Promise<Array<Entity>>;
}
