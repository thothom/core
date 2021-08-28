import { FindOneOptions, FindOptions } from "../types/find-options";

import { BaseQueryOptions } from "../types/query-options";

export type Find<Entity> = (
	conditions: FindOptions<Entity>,
	options?: BaseQueryOptions,
) => Promise<Array<Entity>>;

export type FindOne<Entity> = (
	conditions: FindOneOptions<Entity>,
	options?: BaseQueryOptions,
) => Promise<Entity>;
