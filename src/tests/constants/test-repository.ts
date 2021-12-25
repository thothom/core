/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseRepository } from "../../lib/repository";
import { AfterCountParams } from "../../lib/repository/methods/count/after";
import { AfterDeleteParams } from "../../lib/repository/methods/delete/after";
import { AfterFindParams } from "../../lib/repository/methods/find/after";
import { AfterFindOneParams } from "../../lib/repository/methods/find-one/after";
import { AfterInsertParams } from "../../lib/repository/methods/insert/after";
import { AfterPerformativeCountParams } from "../../lib/repository/methods/performative-count/after";
import { AfterRecoverParams } from "../../lib/repository/methods/recover/after";
import { AfterSaveParams } from "../../lib/repository/methods/save/after";
import { AfterSoftDeleteParams } from "../../lib/repository/methods/soft-delete/after";
import { AfterUpdateParams } from "../../lib/repository/methods/update/after";
import { AfterUpsertParams } from "../../lib/repository/methods/upsert/after";
import { BeforeCountInput } from "../../lib/repository/methods/count/before";
import { BeforeDeleteInput } from "../../lib/repository/methods/delete/before";
import { BeforeFindInput } from "../../lib/repository/methods/find/before";
import { BeforeFindOneInput } from "../../lib/repository/methods/find-one/before";
import { BeforeInsertInput } from "../../lib/repository/methods/insert/before";
import { BeforePerformativeCountInput } from "../../lib/repository/methods/performative-count/before";
import { BeforeRecoverInput } from "../../lib/repository/methods/recover/before";
import { BeforeSaveInput } from "../../lib/repository/methods/save/before";
import { BeforeSoftDeleteInput } from "../../lib/repository/methods/soft-delete/before";
import { BeforeUpdateInput } from "../../lib/repository/methods/update/before";
import { BeforeUpsertInput } from "../../lib/repository/methods/upsert/before";
import { FindConditions } from "../../lib/repository/types/find-conditions";
import {
	FindOptions,
	FindOneOptions,
} from "../../lib/repository/types/find-options";
import { BaseQueryOptions } from "../../lib/repository/types/query-options";
import { ClassType } from "../../lib/types/class-type";
import {
	SaveData,
	ArraySaveData,
	SingleSaveData,
} from "../../lib/repository/types/save-conditions";

const ERROR_MESSAGE = "Method not implemented.";

export class TestRepository<Entity> extends BaseRepository<Entity> {
	public save(
		_data: SingleSaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<Entity>;
	public save(
		_data: ArraySaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity>>;
	public save(
		_data: SaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity> | Entity> {
		throw new Error(ERROR_MESSAGE);
	}

	public insert(
		_data: SingleSaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<Entity>;
	public insert(
		_data: ArraySaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity>>;
	public insert(
		_data: SaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity> | Entity> {
		throw new Error(ERROR_MESSAGE);
	}

	public update(
		_conditions: FindOneOptions<ClassType<Entity>>["where"],
		_data: SingleSaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity>> {
		throw new Error(ERROR_MESSAGE);
	}

	public upsert(
		_conditions: FindOneOptions<ClassType<Entity>>["where"],
		_data: SingleSaveData<ClassType<Entity>>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity>> {
		throw new Error(ERROR_MESSAGE);
	}

	public find(
		_conditions: FindOptions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity>> {
		throw new Error(ERROR_MESSAGE);
	}

	public findOne(
		_conditions: FindOneOptions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Entity> {
		throw new Error(ERROR_MESSAGE);
	}

	public delete(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<number> {
		throw new Error(ERROR_MESSAGE);
	}

	public softDelete(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<number> {
		throw new Error(ERROR_MESSAGE);
	}

	public recover(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<number> {
		throw new Error(ERROR_MESSAGE);
	}

	public count(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<number> {
		throw new Error(ERROR_MESSAGE);
	}

	public performativeCount(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<number> {
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
