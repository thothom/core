/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseConnection } from "../../lib/connection";
import { BaseRepository } from "../../lib/repository";
import { TestRepository } from "./test-repository";

export class TestConnection extends BaseConnection {
	public connect(): Promise<void> {
		throw new Error("Method not implemented.");
	}

	public getRepository<Entity>(
		entity: any,
	): BaseRepository<Entity, void, void> {
		return new TestRepository(this.entityManager, this.logger, entity);
	}

	public override get name() {
		return super.name;
	}

	public override get options() {
		return super.options;
	}

	public override get entityManager() {
		return super.entityManager;
	}

	public override get logger() {
		return super.logger;
	}
}
