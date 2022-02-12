import type { EntityManager } from "../entity-manager";
import type { Logger } from "../logger";

import type { AfterCountParams } from "./methods/count/after";
import { afterCount } from "./methods/count/after";
import type {
	BeforeCountInput,
	BeforeCountOutput,
} from "./methods/count/before";
import { beforeCount } from "./methods/count/before";
import type { AfterDeleteParams } from "./methods/delete/after";
import { afterDelete } from "./methods/delete/after";
import type {
	BeforeDeleteInput,
	BeforeDeleteOutput,
} from "./methods/delete/before";
import { beforeDelete } from "./methods/delete/before";
import type { AfterFindOneParams } from "./methods/find-one/after";
import { afterFindOne } from "./methods/find-one/after";
import type {
	BeforeFindOneInput,
	BeforeFindOneOutput,
} from "./methods/find-one/before";
import { beforeFindOne } from "./methods/find-one/before";
import type { AfterFindParams } from "./methods/find/after";
import { afterFind } from "./methods/find/after";
import type { BeforeFindInput, BeforeFindOutput } from "./methods/find/before";
import { beforeFind } from "./methods/find/before";
import type { AfterInsertParams } from "./methods/insert/after";
import { afterInsert } from "./methods/insert/after";
import type {
	BeforeInsertInput,
	BeforeInsertOutput,
} from "./methods/insert/before";
import { beforeInsert } from "./methods/insert/before";
import type { AfterPerformativeCountParams } from "./methods/performative-count/after";
import { afterPerformativeCount } from "./methods/performative-count/after";
import type {
	BeforePerformativeCountInput,
	BeforePerformativeCountOutput,
} from "./methods/performative-count/before";
import { beforePerformativeCount } from "./methods/performative-count/before";
import type { AfterRecoverParams } from "./methods/recover/after";
import { afterRecover } from "./methods/recover/after";
import type {
	BeforeRecoverInput,
	BeforeRecoverOutput,
} from "./methods/recover/before";
import { beforeRecover } from "./methods/recover/before";
import type { AfterSaveParams } from "./methods/save/after";
import { afterSave } from "./methods/save/after";
import type { BeforeSaveInput, BeforeSaveOutput } from "./methods/save/before";
import { beforeSave } from "./methods/save/before";
import type { AfterSoftDeleteParams } from "./methods/soft-delete/after";
import { afterSoftDelete } from "./methods/soft-delete/after";
import type {
	BeforeSoftDeleteInput,
	BeforeSoftDeleteOutput,
} from "./methods/soft-delete/before";
import { beforeSoftDelete } from "./methods/soft-delete/before";
import type { AfterUpdateParams } from "./methods/update/after";
import { afterUpdate } from "./methods/update/after";
import type {
	BeforeUpdateInput,
	BeforeUpdateOutput,
} from "./methods/update/before";
import { beforeUpdate } from "./methods/update/before";
import type { AfterUpsertParams } from "./methods/upsert/after";
import { afterUpsert } from "./methods/upsert/after";
import type {
	BeforeUpsertInput,
	BeforeUpsertOutput,
} from "./methods/upsert/before";
import { beforeUpsert } from "./methods/upsert/before";

import type { BaseExtraMetadata } from "../types/extra-metadata";
import type { FindConditions } from "./types/find-conditions";
import type { FindOneOptions, FindOptions } from "./types/find-options";
import type { CountOutput } from "./types/methods-outputs/count";
import type { DeleteOutput } from "./types/methods-outputs/delete";
import type { FindOutput } from "./types/methods-outputs/find";
import type { FindOneOutput } from "./types/methods-outputs/find-one";
import type { InsertOutput } from "./types/methods-outputs/insert";
import type { PerformativeCountOutput } from "./types/methods-outputs/performative-count";
import type { RecoverOutput } from "./types/methods-outputs/recover";
import type { SaveOutput } from "./types/methods-outputs/save";
import type { SoftDeleteOutput } from "./types/methods-outputs/soft-delete";
import type { UpdateOutput } from "./types/methods-outputs/update";
import type { UpsertOutput } from "./types/methods-outputs/upsert";
import type { BaseQueryOptions } from "./types/query-options";
import type { SingleSaveData, ArraySaveData } from "./types/save-conditions";

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
	): Promise<SaveOutput<Entity>>;
	public abstract save(
		data: ArraySaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<SaveOutput<Array<Entity>>>;

	/**
	 * Inserts a record on the database and fail if it's already exist.
	 */
	public abstract insert(
		data: SingleSaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<InsertOutput<Entity>>;
	public abstract insert(
		data: ArraySaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<InsertOutput<Array<Entity>>>;

	/**
	 * Updates a record based on a query and fail if it's not exist.
	 */
	public abstract update(
		conditions: FindConditions<Entity>,
		data: SingleSaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<UpdateOutput<Array<Entity>>>;

	/**
	 * Make an "upsert" operation based on a query.
	 */
	public abstract upsert(
		conditions: FindConditions<Entity>,
		data: SingleSaveData<Entity>,
		options?: BaseQueryOptions,
	): Promise<UpsertOutput<Array<Entity>>>;

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
	): Promise<FindOutput<Array<Entity>>>;

	/**
	 * Find one record based on a query.
	 */
	public abstract findOne(
		conditions: FindOneOptions<Entity>,
		options?: BaseQueryOptions,
	): Promise<FindOneOutput<Entity>>;

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
	): Promise<DeleteOutput>;

	/**
	 * Soft delete a record based on a query condition.
	 *
	 * **WARN:** To use this method, the entity must have
	 * a column decorated with `DeleteDateColumn`.
	 */
	public abstract softDelete(
		where: FindConditions<Entity>,
		options?: BaseQueryOptions,
	): Promise<SoftDeleteOutput>;

	/**
	 * Recovers a record that was sof-deleted.
	 *
	 * **WARN:** To use this method, the entity must have
	 * a column decorated with `DeleteDateColumn`.
	 */
	public abstract recover(
		where: FindConditions<Entity>,
		options?: BaseQueryOptions,
	): Promise<RecoverOutput>;

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
	): Promise<CountOutput>;

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
	): Promise<PerformativeCountOutput>;

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
	protected beforeSave(params: BeforeSaveInput<Entity>): BeforeSaveOutput {
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
	protected beforeInsert(
		params: BeforeInsertInput<Entity>,
	): BeforeInsertOutput {
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
	protected beforeUpdate(
		params: BeforeUpdateInput<Entity>,
	): BeforeUpdateOutput {
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
	protected beforeUpsert(
		params: BeforeUpsertInput<Entity>,
	): BeforeUpsertOutput {
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
	protected beforeFind(params: BeforeFindInput<Entity>): BeforeFindOutput {
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
	protected beforeFindOne(
		params: BeforeFindOneInput<Entity>,
	): BeforeFindOneOutput {
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
	protected beforeDelete(
		params: BeforeDeleteInput<Entity>,
	): BeforeDeleteOutput {
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
	protected beforeSoftDelete(
		params: BeforeSoftDeleteInput<Entity>,
	): BeforeSoftDeleteOutput {
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
	protected beforeRecover(
		params: BeforeRecoverInput<Entity>,
	): BeforeRecoverOutput {
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
	protected beforeCount(params: BeforeCountInput<Entity>): BeforeCountOutput {
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
		params: BeforePerformativeCountInput<Entity>,
	): BeforePerformativeCountOutput {
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
