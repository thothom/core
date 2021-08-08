import { FindOperator } from "../operators/base";

type FindConditions<T> = {
	[P in keyof T]?: FindConditions<T[P]> | FindOperator<FindConditions<T[P]>>;
};

export interface FindOneOptions<Entity> {
	/**
	 * Specifies what columns should be retrieved.
	 */
	select?: Array<keyof Entity>;

	/**
	 * Simple condition that should be applied to match entities.
	 */
	where?: Array<FindConditions<Entity>> | FindConditions<Entity>;

	/**
	 * Order, in which entities should be ordered.
	 */
	order?: { [P in keyof Entity]?: "ASC" | "DESC" };

	/**
	 * Indicates if soft-deleted rows should be included in entity result.
	 */
	withDeleted?: boolean;
}

export interface FindManyOptions<Entity> extends FindOneOptions<Entity> {
	/**
	 * Offset (paginated) where from entities should be taken.
	 */
	skip?: number;

	/**
	 * Limit (paginated) - max number of entities should be taken.
	 */
	take?: number;
}
