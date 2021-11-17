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
import { BeforeCountParams } from "../../lib/repository/methods/count/before";
import { BeforeDeleteParams } from "../../lib/repository/methods/delete/before";
import { BeforeFindParams } from "../../lib/repository/methods/find/before";
import { BeforeFindOneParams } from "../../lib/repository/methods/find-one/before";
import { BeforeInsertParams } from "../../lib/repository/methods/insert/before";
import { BeforePerformativeCountParams } from "../../lib/repository/methods/performative-count/before";
import { BeforeRecoverParams } from "../../lib/repository/methods/recover/before";
import { BeforeSaveParams } from "../../lib/repository/methods/save/before";
import { BeforeSoftDeleteParams } from "../../lib/repository/methods/soft-delete/before";
import { BeforeUpdateParams } from "../../lib/repository/methods/update/before";
import { BeforeUpsertInput } from "../../lib/repository/methods/upsert/before";
import { FindConditions } from "../../lib/repository/types/find-conditions";
import {
	FindOptions,
	FindOneOptions,
} from "../../lib/repository/types/find-options";
import { BaseQueryOptions } from "../../lib/repository/types/query-options";
import { ClassType } from "../../lib/types/class-type";

const ERROR_MESSAGE = "Method not implemented.";

export class TestRepository<Entity> extends BaseRepository<Entity> {
	public save<Result = Array<Entity> | Entity>(
		_data: Array<ClassType<Entity>> | ClassType<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Result> {
		throw new Error(ERROR_MESSAGE);
	}

	public insert<Result = Array<Entity> | Entity>(
		_data: Array<ClassType<Entity>> | ClassType<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Result> {
		throw new Error(ERROR_MESSAGE);
	}

	public update<Result = Array<Entity> | Entity>(
		_conditions: FindOneOptions<Entity>["where"],
		_data: ClassType<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Result> {
		throw new Error(ERROR_MESSAGE);
	}

	public upsert<Result = Array<Entity> | Entity>(
		_conditions: FindOneOptions<Entity>["where"],
		_data: ClassType<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Result> {
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

	public override beforeSave(params: BeforeSaveParams<Entity>) {
		return super.beforeSave(params);
	}

	public override afterSave(params: AfterSaveParams) {
		return super.afterSave(params);
	}

	public override beforeInsert(params: BeforeInsertParams<Entity>) {
		return super.beforeInsert(params);
	}

	public override afterInsert(params: AfterInsertParams) {
		return super.afterInsert(params);
	}

	public override beforeUpdate(params: BeforeUpdateParams<Entity>) {
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

	public override beforeFind(params: BeforeFindParams<Entity>) {
		return super.beforeFind(params);
	}

	public override afterFind(params: AfterFindParams<Entity>) {
		return super.afterFind(params);
	}

	public override beforeFindOne(params: BeforeFindOneParams<Entity>) {
		return super.beforeFindOne(params);
	}

	public override afterFindOne(params: AfterFindOneParams<Entity>) {
		return super.afterFindOne(params);
	}

	public override beforeDelete(params: BeforeDeleteParams<Entity>) {
		return super.beforeDelete(params);
	}

	public override afterDelete(params: AfterDeleteParams<Entity>) {
		return super.afterDelete(params);
	}

	public override beforeSoftDelete(params: BeforeSoftDeleteParams<Entity>) {
		return super.beforeSoftDelete(params);
	}

	public override afterSoftDelete(params: AfterSoftDeleteParams<Entity>) {
		return super.afterSoftDelete(params);
	}

	public override beforeRecover(params: BeforeRecoverParams<Entity>) {
		return super.beforeRecover(params);
	}

	public override afterRecover(params: AfterRecoverParams<Entity>) {
		return super.afterRecover(params);
	}

	public override beforeCount(params: BeforeCountParams<Entity>) {
		return super.beforeCount(params);
	}

	public override afterCount(params: AfterCountParams<Entity>) {
		return super.afterCount(params);
	}

	public override beforePerformativeCount(
		params: BeforePerformativeCountParams<Entity>,
	) {
		return super.beforePerformativeCount(params);
	}

	public override afterPerformativeCount(
		params: AfterPerformativeCountParams<Entity>,
	) {
		return super.afterPerformativeCount(params);
	}
}
