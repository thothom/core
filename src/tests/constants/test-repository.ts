/* eslint-disable @typescript-eslint/no-unused-vars */

import { Repository } from "../../lib/repository";
import { AfterCountParams } from "../../lib/repository/methods/after-count";
import { AfterDeleteParams } from "../../lib/repository/methods/after-delete";
import { AfterFindParams } from "../../lib/repository/methods/after-find";
import { AfterFindOneParams } from "../../lib/repository/methods/after-find-one";
import { AfterInsertParams } from "../../lib/repository/methods/after-insert";
import { AfterRecoverParams } from "../../lib/repository/methods/after-recover";
import { AfterSaveParams } from "../../lib/repository/methods/after-save";
import { AfterSoftDeleteParams } from "../../lib/repository/methods/after-soft-delete";
import { AfterUpdateParams } from "../../lib/repository/methods/after-update";
import { AfterUpsertParams } from "../../lib/repository/methods/after-upsert";
import { BeforeCountParams } from "../../lib/repository/methods/before-count";
import { BeforeDeleteParams } from "../../lib/repository/methods/before-delete";
import { BeforeFindParams } from "../../lib/repository/methods/before-find";
import { BeforeFindOneParams } from "../../lib/repository/methods/before-find-one";
import { BeforeInsertParams } from "../../lib/repository/methods/before-insert";
import { BeforeRecoverParams } from "../../lib/repository/methods/before-recover";
import { BeforeSaveParams } from "../../lib/repository/methods/before-save";
import { BeforeSoftDeleteParams } from "../../lib/repository/methods/before-soft-delete";
import { BeforeUpdateParams } from "../../lib/repository/methods/before-update";
import { BeforeUpsertParams } from "../../lib/repository/methods/before-upsert";
import { FindConditions } from "../../lib/repository/queries/types/find-conditions";
import {
	FindOptions,
	FindOneOptions,
} from "../../lib/repository/queries/types/find-options";
import { BaseQueryOptions } from "../../lib/repository/queries/types/query-options";

const ERROR_MESSAGE = "Method not implemented.";

export class TestRepository<Entity> extends Repository<Entity, void, void> {
	public save(
		_data: Array<Partial<Entity>> | Partial<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity> | Entity> {
		throw new Error(ERROR_MESSAGE);
	}

	public insert(
		_data: Array<Partial<Entity>> | Partial<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity> | Entity> {
		throw new Error(ERROR_MESSAGE);
	}

	public update(
		_conditions: FindOneOptions<Entity>["where"],
		_data: Partial<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity> | Entity> {
		throw new Error(ERROR_MESSAGE);
	}

	public upsert(
		_conditions: FindOneOptions<Entity>["where"],
		_data: Partial<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity> | Entity> {
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

	public override beforeUpsert(params: BeforeUpsertParams<Entity>) {
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
}
