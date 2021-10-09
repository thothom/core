import { EntityManager } from "../entity-manager";
import { afterSave, AfterSaveParams } from "./methods/after-save";
import { afterInsert, AfterInsertParams } from "./methods/after-insert";
import { beforeSave, BeforeSaveParams } from "./methods/before-save";
import { beforeInsert, BeforeInsertParams } from "./methods/before-insert";
import { FindConditions } from "./queries/types/find-conditions";
import { FindOneOptions, FindOptions } from "./queries/types/find-options";
import { BaseQueryOptions } from "./queries/types/query-options";
import { beforeUpdate, BeforeUpdateParams } from "./methods/before-update";
import { afterUpdate, AfterUpdateParams } from "./methods/after-update";
import { AfterUpsertParams, afterUpsert } from "./methods/after-upsert";
import { BeforeUpsertParams, beforeUpsert } from "./methods/before-upsert";
import { AfterFindParams, afterFind } from "./methods/after-find";
import { BeforeFindParams, beforeFind } from "./methods/before-find";
import { beforeFindOne, BeforeFindOneParams } from "./methods/before-find-one";
import { afterFindOne, AfterFindOneParams } from "./methods/after-find-one";
import { beforeDelete, BeforeDeleteParams } from "./methods/before-delete";
import { afterDelete, AfterDeleteParams } from "./methods/after-delete";
import {
	beforeSoftDelete,
	BeforeSoftDeleteParams,
} from "./methods/before-soft-delete";
import {
	afterSoftDelete,
	AfterSoftDeleteParams,
} from "./methods/after-soft-delete";
import { beforeRecover, BeforeRecoverParams } from "./methods/before-recover";
import { AfterRecoverParams, afterRecover } from "./methods/after-recover";
import { AfterCountParams, afterCount } from "./methods/after-count";
import { BeforeCountParams, beforeCount } from "./methods/before-count";
import {
	AfterPerformativeCountParams,
	afterPerformativeCount,
} from "./methods/after-performative-count";
import {
	BeforePerformativeCountParams,
	beforePerformativeCount,
} from "./methods/before-performative-count";

export abstract class Repository<
	Entity,
	EntityExtraMetadata,
	ColumnExtraMetadata,
> {
	public constructor(
		private readonly entityManager: EntityManager<
			EntityExtraMetadata,
			ColumnExtraMetadata
		>,
		private readonly entity: Entity,
	) {}

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
	public abstract save(
		data: BeforeSaveParams<Entity>["data"],
		options?: BeforeSaveParams<Entity>["options"],
	): Promise<Array<Entity> | Entity>;

	/**
	 * Inserts a record on the database and fail if it's already exist.
	 */
	public abstract insert(
		data: BeforeSaveParams<Entity>["data"],
		options?: BeforeSaveParams<Entity>["options"],
	): Promise<Array<Entity> | Entity>;

	/**
	 * Updates a record based on a query and fail if it's not exist.
	 */
	public abstract update(
		conditions: FindConditions<Entity>,
		data: Partial<Entity>,
		options?: BaseQueryOptions,
	): Promise<Array<Entity> | Entity>;

	/**
	 * Make an "upsert" operation based on a query.
	 */
	public abstract upsert(
		conditions: FindConditions<Entity>,
		data: Partial<Entity>,
		options?: BaseQueryOptions,
	): Promise<Array<Entity> | Entity>;

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
	public abstract find(
		conditions: FindOptions<Entity>,
		options?: BaseQueryOptions,
	): Promise<Array<Entity>>;

	/**
	 * Find one record based on a query.
	 */
	public abstract findOne(
		conditions: FindOneOptions<Entity>,
		options?: BaseQueryOptions,
	): Promise<Entity>;

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
	public abstract delete(
		where: FindConditions<Entity>,
		options?: BaseQueryOptions,
	): Promise<number>;

	/**
	 * Soft delete a record based on a query condition.
	 *
	 * **WARN:** To use this method, the entity must have
	 * a column decorated with `DeleteDateColumn`.
	 */
	public abstract softDelete(
		where: FindConditions<Entity>,
		options?: BaseQueryOptions,
	): Promise<number>;

	/**
	 * Recovers a record that was sof-deleted.
	 *
	 * **WARN:** To use this method, the entity must have
	 * a column decorated with `DeleteDateColumn`.
	 */
	public abstract recover(
		where: FindConditions<Entity>,
		options?: BaseQueryOptions,
	): Promise<number>;

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
	public abstract count(
		where: FindConditions<Entity>,
		options?: BaseQueryOptions,
	): Promise<number>;

	/**
	 * Some databases, like PostgreSQL, have methods that allow
	 * you to make a count operation in a more performative way,
	 * but it's not very precise.
	 *
	 * This methods allow you to make a count operator, that
	 * in some cases can be imprecise, but is more performative
	 */
	public abstract performativeCount(
		where: FindConditions<Entity>,
		options?: BaseQueryOptions,
	): Promise<number>;

	/**
	 * --------------------------------------------------
	 *
	 * BEFORE & AFTER save
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Handles the data before the start of the function
	 *
	 * Does things like auto-generate values and format the
	 * data to the database format
	 */
	protected beforeSave(params: BeforeSaveParams<Entity>) {
		return beforeSave<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * Handles the data after the end of the function
	 *
	 * Does things like format the data to the entity format
	 */
	protected afterSave(params: AfterSaveParams) {
		return afterSave<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * --------------------------------------------------
	 *
	 * BEFORE & AFTER insert
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Handles the data before the start of the function
	 *
	 * Does things like auto-generate values and format the
	 * data to the database format
	 */
	protected beforeInsert(params: BeforeInsertParams<Entity>) {
		return beforeInsert<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * Handles the data after the end of the function
	 *
	 * Does things like format the data to the entity format
	 */
	protected afterInsert(params: AfterInsertParams) {
		return afterInsert<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * --------------------------------------------------
	 *
	 * BEFORE & AFTER update
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Handles the data before the start of the function
	 *
	 * Does things like auto-generate values and format the
	 * data to the database format
	 */
	protected beforeUpdate(params: BeforeUpdateParams<Entity>) {
		return beforeUpdate<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * Handles the data after the end of the function
	 *
	 * Does things like format the data to the entity format
	 */
	protected afterUpdate(params: AfterUpdateParams<Entity>) {
		return afterUpdate<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * --------------------------------------------------
	 *
	 * BEFORE & AFTER upsert
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Handles the data before the start of the function
	 *
	 * Does things like auto-generate values and format the
	 * data to the database format
	 */
	protected beforeUpsert(params: BeforeUpsertParams<Entity>) {
		return beforeUpsert<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * Handles the data after the end of the function
	 *
	 * Does things like format the data to the entity format
	 */
	protected afterUpsert(params: AfterUpsertParams<Entity>) {
		return afterUpsert<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * --------------------------------------------------
	 *
	 * BEFORE & AFTER find
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Handles the data before the start of the function
	 *
	 * Does things like auto-generate values and format the
	 * data to the database format
	 */
	protected beforeFind(params: BeforeFindParams<Entity>) {
		return beforeFind<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * Handles the data after the end of the function
	 *
	 * Does things like format the data to the entity format
	 */
	protected afterFind(params: AfterFindParams<Entity>): Array<Entity> {
		return afterFind<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * --------------------------------------------------
	 *
	 * BEFORE & AFTER findOne
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Handles the data before the start of the function
	 *
	 * Does things like auto-generate values and format the
	 * data to the database format
	 */
	protected beforeFindOne(params: BeforeFindOneParams<Entity>) {
		return beforeFindOne<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * Handles the data after the end of the function
	 *
	 * Does things like format the data to the entity format
	 */
	protected afterFindOne(params: AfterFindOneParams<Entity>): Entity {
		return afterFindOne<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * --------------------------------------------------
	 *
	 * BEFORE & AFTER delete
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Handles the data before the start of the function
	 *
	 * Does things like auto-generate values and format the
	 * data to the database format
	 */
	protected beforeDelete(params: BeforeDeleteParams<Entity>) {
		return beforeDelete<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * Handles the data after the end of the function
	 *
	 * Does things like format the data to the entity format
	 */
	protected afterDelete(params: AfterDeleteParams<Entity>): number {
		return afterDelete<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * --------------------------------------------------
	 *
	 * BEFORE & AFTER softDelete
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Handles the data before the start of the function
	 *
	 * Does things like auto-generate values and format the
	 * data to the database format
	 */
	protected beforeSoftDelete(params: BeforeSoftDeleteParams<Entity>) {
		return beforeSoftDelete<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * Handles the data after the end of the function
	 *
	 * Does things like format the data to the entity format
	 */
	protected afterSoftDelete(params: AfterSoftDeleteParams<Entity>): number {
		return afterSoftDelete<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * --------------------------------------------------
	 *
	 * BEFORE & AFTER recover
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Handles the data before the start of the function
	 *
	 * Does things like auto-generate values and format the
	 * data to the database format
	 */
	protected beforeRecover(params: BeforeRecoverParams<Entity>) {
		return beforeRecover<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * Handles the data after the end of the function
	 *
	 * Does things like format the data to the entity format
	 */
	protected afterRecover(params: AfterRecoverParams<Entity>): number {
		return afterRecover<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * --------------------------------------------------
	 *
	 * BEFORE & AFTER count
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Handles the data before the start of the function
	 *
	 * Does things like auto-generate values and format the
	 * data to the database format
	 */
	protected beforeCount(params: BeforeCountParams<Entity>) {
		return beforeCount<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * Handles the data after the end of the function
	 *
	 * Does things like format the data to the entity format
	 */
	protected afterCount(params: AfterCountParams<Entity>): number {
		return afterCount<Entity, EntityExtraMetadata, ColumnExtraMetadata>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * --------------------------------------------------
	 *
	 * BEFORE & AFTER performativeCount
	 *
	 * --------------------------------------------------
	 */

	/**
	 * Handles the data before the start of the function
	 *
	 * Does things like auto-generate values and format the
	 * data to the database format
	 */
	protected beforePerformativeCount(
		params: BeforePerformativeCountParams<Entity>,
	) {
		return beforePerformativeCount<
			Entity,
			EntityExtraMetadata,
			ColumnExtraMetadata
		>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}

	/**
	 * Handles the data after the end of the function
	 *
	 * Does things like format the data to the entity format
	 */
	protected afterPerformativeCount(
		params: AfterPerformativeCountParams<Entity>,
	): number {
		return afterPerformativeCount<
			Entity,
			EntityExtraMetadata,
			ColumnExtraMetadata
		>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}
}
