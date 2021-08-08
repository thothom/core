import {
	FindManyByPrimaryKey,
	FindOneByPrimaryKey,
} from "./queries/find/find-by-primary-key";
import { Save } from "./queries/save/save";

export interface Repository<Entity> {
	save: Save<Entity>;
	findOneByPrimaryKey: FindOneByPrimaryKey<Entity>;
	findManyByPrimaryKey: FindManyByPrimaryKey<Entity>;
}
