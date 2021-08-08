import {
	FindManyByPrimaryKey,
	FindOneByPrimaryKey,
} from "./types/methods/find-by-primary-key";
import { Save } from "./types/methods/save";

export interface Repository<Entity> {
	save: Save<Entity>;
	findOneByPrimaryKey: FindOneByPrimaryKey<Entity>;
	findManyByPrimaryKey: FindManyByPrimaryKey<Entity>;
}
