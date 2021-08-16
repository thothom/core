import { Count } from "./queries/methods/count";
import { Delete } from "./queries/methods/delete";
import { Find, FindOne } from "./queries/methods/find";
import { Save, Upsert } from "./queries/methods/save";

export interface Repository<Entity> {
	/**
	 * --------------------------------------------------
	 *
	 * Insert / Update
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Make an "upsert" operation based on the primary keys.
	 *
	 * This is an more performative way to make an "upsert",
	 * and most of the databases supports this method.
	 */
	save: Save<Entity>;
	/**
	 * Inserts a record on the database and fail if it's already exist.
	 */
	insert: Save<Entity>;
	/**
	 * Updates a record based on a query and fail if it's not exist.
	 */
	update: Upsert<Entity>;
	/**
	 * Make an "upsert" operation based on a query.
	 */
	upsert: Upsert<Entity>;

	/**
	 * --------------------------------------------------
	 *
	 * Find
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Find many records based on a query.
	 */
	find: Find<Entity>;
	/**
	 * Find one record based on a query.
	 */
	findOne: FindOne<Entity>;

	/**
	 * --------------------------------------------------
	 *
	 * Delete
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Delete a record based on a query condition.
	 */
	delete: Delete<Entity>;
	/**
	 * Soft delete a record based on a query condition.
	 *
	 * **WARN:** To use this method, the entity must have
	 * a column decorated with `DeleteDateColumn`.
	 */
	softDelete: Delete<Entity>;
	/**
	 * Recovers a record that was sof-deleted.
	 *
	 * **WARN:** To use this method, the entity must have
	 * a column decorated with `DeleteDateColumn`.
	 */
	recover: Delete<Entity>;

	/**
	 * --------------------------------------------------
	 *
	 * Count
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Count the records returned by a query condition.
	 */
	count: Count<Entity>;

	/**
	 * Some databases, like PostgreSQL, have methods that allow
	 * you to make a count operation in a more performative way,
	 * but it's not very precise.
	 *
	 * This methods allow you to make a count operator, that
	 * in some cases can be imprecise, but is more performative
	 */
	performativeCount: Count<Entity>;
}
