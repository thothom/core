import { EntityManager } from "../entity-manager";
import { afterSave, AfterSaveParams } from "./methods/save/after";
import { afterInsert, AfterInsertParams } from "./methods/insert/after";
import { beforeSave, BeforeSaveParams } from "./methods/save/before";
import { beforeInsert, BeforeInsertParams } from "./methods/insert/before";
import { FindConditions } from "./types/find-conditions";
import { FindOneOptions, FindOptions } from "./types/find-options";
import { BaseQueryOptions } from "./types/query-options";
import { beforeUpdate, BeforeUpdateParams } from "./methods/update/before";
import { afterUpdate, AfterUpdateParams } from "./methods/update/after";
import { AfterUpsertParams, afterUpsert } from "./methods/upsert/after";
import { BeforeUpsertParams, beforeUpsert } from "./methods/upsert/before";
import { AfterFindParams, afterFind } from "./methods/find/after";
import { BeforeFindParams, beforeFind } from "./methods/find/before";
import { beforeFindOne, BeforeFindOneParams } from "./methods/find-one/before";
import { afterFindOne, AfterFindOneParams } from "./methods/find-one/after";
import { beforeDelete, BeforeDeleteParams } from "./methods/delete/before";
import { afterDelete, AfterDeleteParams } from "./methods/delete/after";
import {
	beforeSoftDelete,
	BeforeSoftDeleteParams,
} from "./methods/soft-delete/before";
import {
	afterSoftDelete,
	AfterSoftDeleteParams,
} from "./methods/soft-delete/after";
import { beforeRecover, BeforeRecoverParams } from "./methods/recover/before";
import { AfterRecoverParams, afterRecover } from "./methods/recover/after";
import { AfterCountParams, afterCount } from "./methods/count/after";
import { BeforeCountParams, beforeCount } from "./methods/count/before";
import {
	AfterPerformativeCountParams,
	afterPerformativeCount,
} from "./methods/performative-count/after";
import {
	BeforePerformativeCountParams,
	beforePerformativeCount,
} from "./methods/performative-count/before";
import type { SingleSaveData, ArraySaveData } from "./types/save-conditions";
import { Logger } from "../logger";
import { BaseExtraMetadata } from "../types/extra-metadata";

export abstract class BaseRepository<
	Entity = any,
	ExtraMetadata extends BaseExtraMetadata = any,
> {
	protected readonly entity: Entity;

	public readonly tableName: string;

	public constructor(
		protected readonly entityManager: EntityManager<ExtraMetadata>,
		protected readonly logger: Logger,
		entity: any,
	) {
		// This is made so the entity can have the right type
		this.entity = entity;

		const entityMetadata = this.entityManager.getEntityMetadata(entity);

		this.tableName = entityMetadata.databaseName;
	}

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
		data: SingleSaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<Entity>;
	public abstract save(
		data: ArraySaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<Array<Entity>>;

	/**
	 * Inserts a record on the database and fail if it's already exist.
	 */
	public abstract insert(
		data: SingleSaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<Entity>;
	public abstract insert(
		data: ArraySaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<Array<Entity>>;

	/**
	 * Updates a record based on a query and fail if it's not exist.
	 */
	public abstract update(
		conditions: FindConditions<Entity>,
		data: SingleSaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<Array<Entity>>;

	/**
	 * Make an "upsert" operation based on a query.
	 */
	public abstract upsert(
		conditions: FindConditions<Entity>,
		data: SingleSaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<Array<Entity>>;

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
		return beforeSave<Entity>(
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
	protected afterSave(params: AfterSaveParams): Array<Entity> | Entity {
		const result: Array<Entity> | Entity = afterSave<Entity>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);

		return result;
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
		return beforeInsert<Entity>(
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
	protected afterInsert(params: AfterInsertParams): Array<Entity> | Entity {
		const result: Array<Entity> | Entity = afterInsert<Entity>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);

		return result;
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
		return beforeUpdate<Entity>(
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
	protected afterUpdate(params: AfterUpdateParams<Entity>): Array<Entity> {
		const result: Array<Entity> | Entity = afterUpdate<Entity>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);

		return result;
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
		return beforeUpsert<Entity>(
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
	protected afterUpsert(params: AfterUpsertParams<Entity>): Array<Entity> {
		const result: Array<Entity> | Entity = afterUpsert<Entity>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);

		return result as any;
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
		return beforeFind<Entity>(
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
		return afterFind<Entity>(
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
		return beforeFindOne<Entity>(
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
	protected afterFindOne(
		params: AfterFindOneParams<Entity>,
	): Entity | undefined {
		return afterFindOne<Entity>(
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
		return beforeDelete<Entity>(
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
		return afterDelete<Entity>(
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
		return beforeSoftDelete<Entity>(
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
		return afterSoftDelete<Entity>(
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
		return beforeRecover<Entity>(
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
		return afterRecover<Entity>(
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
		return beforeCount<Entity>(
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
		return afterCount<Entity>(
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
		return beforePerformativeCount<Entity>(
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
		return afterPerformativeCount<Entity>(
			{
				entity: this.entity,
				entityManager: this.entityManager,
			},
			params,
		);
	}
}
