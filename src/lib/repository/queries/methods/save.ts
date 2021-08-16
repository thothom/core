import { FindOptions } from "../types/find-options";
import { BaseQueryOptions } from "../types/query-options";

export type Save<Entity> = (
	data: Array<Partial<Entity>> | Partial<Entity>,
	options?: BaseQueryOptions,
) => Promise<Array<Entity> | Entity>;

export type Upsert<Entity> = (
	conditions: FindOptions<Entity>,
	data: Partial<Entity>,
	options?: BaseQueryOptions,
) => Promise<Array<Entity> | Entity>;
