import { FindConditions } from "../types/find-conditions";
import { BaseQueryOptions } from "../types/query-options";

export type Count<Entity> = (
	where: FindConditions<Entity>,
	options?: BaseQueryOptions,
) => Promise<number>;
