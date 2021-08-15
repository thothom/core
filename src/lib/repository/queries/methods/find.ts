import { FindOneOptions, FindOptions } from "../types/find-options";

import { DefaultTypes } from "../../../types/types";
import { BaseQueryOptions } from "../types/query-options";

type PrimaryKeyTypes<Entity> = DefaultTypes | Partial<Entity>;

type FinsManyConditions<Entity> = FindOptions<Entity> | Partial<Entity>;
type FindOneConditions<Entity> = FindOneOptions<Entity> | Partial<Entity>;

export type FindOneByPrimaryKey<Entity> = (
	primaryKey: PrimaryKeyTypes<Entity>,
	options?: BaseQueryOptions,
) => Promise<Entity>;

export type FindManyByPrimaryKey<Entity> = (
	primaryKeys: Array<PrimaryKeyTypes<Entity>>,
	options?: BaseQueryOptions,
) => Promise<Array<Entity>>;

export type Find<Entity> = (
	conditions: FinsManyConditions<Entity>,
	options?: BaseQueryOptions,
) => Promise<Entity>;

export type FindOne<Entity> = (
	conditions: FindOneConditions<Entity>,
	options?: BaseQueryOptions,
) => Promise<Entity>;
