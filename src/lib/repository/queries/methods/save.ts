import { FindOneOptions } from "../types/find-options";
import { BaseQueryOptions } from "../types/query-options";

export type Save<Entity> = (
	data: Array<Partial<Entity>> | Partial<Entity>,
	options?: BaseQueryOptions,
) => Promise<Array<Entity> | Entity>;

export type Upsert<Entity> = (
	conditions: FindOneOptions<Entity>,
	data: Partial<Entity>,
	options?: BaseQueryOptions,
) => Promise<Array<Entity> | Entity>;
