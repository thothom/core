import { FindOperator } from "../find-operators/base";

type InternalFindConditions<T> = {
	[P in keyof T]?: FindOperator | T[P];
};

export type ArrayFindConditions<Entity> = Array<InternalFindConditions<Entity>>;

export type SingleFindConditions<Entity> = InternalFindConditions<Entity>;

export type FindConditions<Entity> =
	| ArrayFindConditions<Entity>
	| SingleFindConditions<Entity>;
