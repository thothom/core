/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sonarjs/no-duplicate-string */

import { Repository } from "../../lib/repository";
import { AfterSaveParams } from "../../lib/repository/methods/after-save";
import { BeforeSaveParams } from "../../lib/repository/methods/before-save";
import { FindConditions } from "../../lib/repository/queries/types/find-conditions";
import {
	FindOptions,
	FindOneOptions,
} from "../../lib/repository/queries/types/find-options";
import { BaseQueryOptions } from "../../lib/repository/queries/types/query-options";

export class TestRepository<Entity> extends Repository<Entity, void, void> {
	public save(
		_data: Array<Partial<Entity>> | Partial<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity> | Entity> {
		throw new Error("Method not implemented.");
	}

	public insert(
		_data: Array<Partial<Entity>> | Partial<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity> | Entity> {
		throw new Error("Method not implemented.");
	}

	public update(
		_conditions: FindOptions<Entity>,
		_data: Partial<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity> | Entity> {
		throw new Error("Method not implemented.");
	}

	public upsert(
		_conditions: FindOptions<Entity>,
		_data: Partial<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity> | Entity> {
		throw new Error("Method not implemented.");
	}

	public find(
		_conditions: FindOptions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Array<Entity>> {
		throw new Error("Method not implemented.");
	}

	public findOne(
		_conditions: FindOneOptions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<Entity> {
		throw new Error("Method not implemented.");
	}

	public delete(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<number> {
		throw new Error("Method not implemented.");
	}

	public softDelete(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<number> {
		throw new Error("Method not implemented.");
	}

	public recover(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<number> {
		throw new Error("Method not implemented.");
	}

	public count(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<number> {
		throw new Error("Method not implemented.");
	}

	public performativeCount(
		_where: FindConditions<Entity>,
		_options?: BaseQueryOptions,
	): Promise<number> {
		throw new Error("Method not implemented.");
	}

	public override beforeSave(params: BeforeSaveParams<Entity>) {
		return super.beforeSave(params);
	}

	public override afterSave(params: AfterSaveParams) {
		return super.afterSave(params);
	}
}