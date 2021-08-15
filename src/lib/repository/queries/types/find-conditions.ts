import { FindOperator } from "../find-operators/base";

type InternalFindConditions<T> = {
	[P in keyof T]?: FindOperator | T[P];
};

export type FindConditions<Entity> =
	| Array<InternalFindConditions<Entity>>
	| InternalFindConditions<Entity>;
