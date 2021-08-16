import { FindOneOptions, FindOptions } from "../types/find-options";

import { BaseQueryOptions } from "../types/query-options";

type FinsConditions<Entity> = FindOptions<Entity> | Partial<Entity>;
type FindOneConditions<Entity> = FindOneOptions<Entity> | Partial<Entity>;

export type Find<Entity> = (
	conditions: FinsConditions<Entity>,
	options?: BaseQueryOptions,
) => Promise<Array<Entity>>;

export type FindOne<Entity> = (
	conditions: FindOneConditions<Entity>,
	options?: BaseQueryOptions,
) => Promise<Entity>;
