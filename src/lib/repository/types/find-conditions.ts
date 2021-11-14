import { FindOperator } from "../operators/find/base";

type InternalFindConditions<T> = {
	[P in keyof T]?: FindOperator | InternalFindConditions<T[P]> | T[P];
};

export type ArrayFindConditions<Entity> = Array<InternalFindConditions<Entity>>;

export type SingleFindConditions<Entity> = InternalFindConditions<Entity>;

export type FindConditions<Entity> =
	| ArrayFindConditions<Entity>
	| SingleFindConditions<Entity>;
