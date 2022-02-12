/* eslint-disable @typescript-eslint/no-unused-vars */

import type {
	CountOutput,
	DeleteOutput,
	FindOneOutput,
	FindOutput,
	InsertOutput,
	PerformativeCountOutput,
	RecoverOutput,
	SaveOutput,
	SoftDeleteOutput,
	UpdateOutput,
	UpsertOutput,
} from "../..";
import { BaseRepository } from "../../lib/repository";
import type { AfterCountParams } from "../../lib/repository/methods/count/after";
import type { BeforeCountInput } from "../../lib/repository/methods/count/before";
import type { AfterDeleteParams } from "../../lib/repository/methods/delete/after";
import type { BeforeDeleteInput } from "../../lib/repository/methods/delete/before";
import type { AfterFindOneParams } from "../../lib/repository/methods/find-one/after";
import type { BeforeFindOneInput } from "../../lib/repository/methods/find-one/before";
import type { AfterFindParams } from "../../lib/repository/methods/find/after";
import type { BeforeFindInput } from "../../lib/repository/methods/find/before";
import type { AfterInsertParams } from "../../lib/repository/methods/insert/after";
import type { BeforeInsertInput } from "../../lib/repository/methods/insert/before";
import type { AfterPerformativeCountParams } from "../../lib/repository/methods/performative-count/after";
import type { BeforePerformativeCountInput } from "../../lib/repository/methods/performative-count/before";
import type { AfterRecoverParams } from "../../lib/repository/methods/recover/after";
import type { BeforeRecoverInput } from "../../lib/repository/methods/recover/before";
import type { AfterSaveParams } from "../../lib/repository/methods/save/after";
import type { BeforeSaveInput } from "../../lib/repository/methods/save/before";
import type { AfterSoftDeleteParams } from "../../lib/repository/methods/soft-delete/after";
import type { BeforeSoftDeleteInput } from "../../lib/repository/methods/soft-delete/before";
import type { AfterUpdateParams } from "../../lib/repository/methods/update/after";
import type { BeforeUpdateInput } from "../../lib/repository/methods/update/before";
import type { AfterUpsertParams } from "../../lib/repository/methods/upsert/after";
import type { BeforeUpsertInput } from "../../lib/repository/methods/upsert/before";

import type { FindConditions } from "../../lib/repository/types/find-conditions";
import type {
	FindOptions,
	FindOneOptions,
} from "../../lib/repository/types/find-options";
import type { BaseQueryOptions } from "../../lib/repository/types/query-options";
import type {
	SaveData,
	ArraySaveData,
	SingleSaveData,
} from "../../lib/repository/types/save-conditions";
import type { ClassType } from "../../lib/types/class-type";

const ERROR_MESSAGE = "Method not implemented.";

export class TestRepository<Entity> extends BaseRepository<Entity> {
	public save(
		_data: SingleSaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<SaveOutput<Entity>>;
	public save(
		_data: ArraySaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<SaveOutput<Array<Entity>>>;
	public save(
		_data: SaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<SaveOutput<Array<Entity> | Entity>> {
		throw new Error(ERROR_MESSAGE);
	}

	public insert(
		_data: SingleSaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<InsertOutput<Entity>>;
	public insert(
		_data: ArraySaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<InsertOutput<Array<Entity>>>;
	public insert(
		_data: SaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<InsertOutput<Array<Entity> | Entity>> {
		throw new Error(ERROR_MESSAGE);
	}

	public update(
		_conditions: FindOneOptions<ClassType<Entity>>["where"],
		_data: SingleSaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<UpdateOutput<Array<Entity>>> {
		throw new Error(ERROR_MESSAGE);
	}

	public upsert(
		_conditions: FindOneOptions<ClassType<Entity>>["where"],
		_data: SingleSaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<UpsertOutput<Array<Entity>>> {
		throw new Error(ERROR_MESSAGE);
	}

	public find(
		_conditions: FindOptions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<FindOutput<Array<Entity>>> {
		throw new Error(ERROR_MESSAGE);
	}

	public findOne(
		_conditions: FindOneOptions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<FindOneOutput<Entity>> {
		throw new Error(ERROR_MESSAGE);
	}

	public delete(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<DeleteOutput> {
		throw new Error(ERROR_MESSAGE);
	}

	public softDelete(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<SoftDeleteOutput> {
		throw new Error(ERROR_MESSAGE);
	}

	public recover(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<RecoverOutput> {
		throw new Error(ERROR_MESSAGE);
	}

	public count(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<CountOutput> {
		throw new Error(ERROR_MESSAGE);
	}

	public performativeCount(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<PerformativeCountOutput> {
		throw new Error(ERROR_MESSAGE);
	}

	public override beforeSave(params: BeforeSaveInput<Entity>) {
		return super.beforeSave(params);
	}

	public override afterSave(params: AfterSaveParams) {
		return super.afterSave(params);
	}

	public override beforeInsert(params: BeforeInsertInput<Entity>) {
		return super.beforeInsert(params);
	}

	public override afterInsert(params: AfterInsertParams) {
		return super.afterInsert(params);
	}

	public override beforeUpdate(params: BeforeUpdateInput<Entity>) {
		return super.beforeUpdate(params);
	}

	public override afterUpdate(params: AfterUpdateParams<Entity>) {
		return super.afterUpdate(params);
	}

	public override beforeUpsert(params: BeforeUpsertInput<Entity>) {
		return super.beforeUpsert(params);
	}

	public override afterUpsert(params: AfterUpsertParams<Entity>) {
		return super.afterUpsert(params);
	}

	public override beforeFind(params: BeforeFindInput<Entity>) {
		return super.beforeFind(params);
	}

	public override afterFind(params: AfterFindParams<Entity>) {
		return super.afterFind(params);
	}

	public override beforeFindOne(params: BeforeFindOneInput<Entity>) {
		return super.beforeFindOne(params);
	}

	public override afterFindOne(params: AfterFindOneParams<Entity>) {
		return super.afterFindOne(params);
	}

	public override beforeDelete(params: BeforeDeleteInput<Entity>) {
		return super.beforeDelete(params);
	}

	public override afterDelete(params: AfterDeleteParams<Entity>) {
		return super.afterDelete(params);
	}

	public override beforeSoftDelete(params: BeforeSoftDeleteInput<Entity>) {
		return super.beforeSoftDelete(params);
	}

	public override afterSoftDelete(params: AfterSoftDeleteParams<Entity>) {
		return super.afterSoftDelete(params);
	}

	public override beforeRecover(params: BeforeRecoverInput<Entity>) {
		return super.beforeRecover(params);
	}

	public override afterRecover(params: AfterRecoverParams<Entity>) {
		return super.afterRecover(params);
	}

	public override beforeCount(params: BeforeCountInput<Entity>) {
		return super.beforeCount(params);
	}

	public override afterCount(params: AfterCountParams<Entity>) {
		return super.afterCount(params);
	}

	public override beforePerformativeCount(
		params: BeforePerformativeCountInput<Entity>,
	) {
		return super.beforePerformativeCount(params);
	}

	public override afterPerformativeCount(
		params: AfterPerformativeCountParams<Entity>,
	) {
		return super.afterPerformativeCount(params);
	}
}
