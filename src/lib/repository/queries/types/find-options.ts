import { Order } from "../../../types/order";
import { FindConditions } from "./find-conditions";

export interface FindOneOptions<Entity> {
	/**
	 * Specifies what columns should be retrieved.
	 */
	select?: Array<keyof Entity>;

	/**
	 * Simple condition that should be applied to match entities.
	 */
	where?: FindConditions<Entity>;

	/**
	 * Order, in which entities should be ordered.
	 */
	order?: Record<string, Order>;

	/**
	 * Indicates if soft-deleted rows should be included in entity result.
	 */
	withDeleted?: boolean;
}

export interface FindOptions<Entity> extends FindOneOptions<Entity> {
	/**
	 * Offset (paginated) where from entities should be taken.
	 *
	 * **Alert: This option isn't supported in most of the NoSQL databases,
	 * try to use the "startFrom" option.**
	 */
	skip?: number;

	/**
	 * Primary Keys of the last item of the previous query.
	 * Used for paginated queries in NoSQL databases.
	 *
	 * In another libs, this option wold be:
	 * - firebase: "startAfter"
	 * - dynamodb: "ExclusiveStartKey"
	 * - mongodb: `{'_id': {'$gt': last_id}}`
	 */
	startFrom?: Partial<Entity>;

	/**
	 * Limit (paginated) - max number of entities should be taken.
	 */
	take?: number;
}
