/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseConnection } from "../../lib/connection";
import { BaseConnectionOptions } from "../../lib/connection/types/connection-options";
import { BaseRepository } from "../../lib/repository";
import { TestRepository } from "./test-repository";

export class TestConnection extends BaseConnection {
	public constructor(options?: BaseConnectionOptions) {
		// Example name of a INSTALLED package
		super("@techmmunity/utils", options);
	}

	public testBasicValidate() {
		super.basicValidate();
	}

	public connect(): Promise<this> {
		throw new Error("Method not implemented.");
	}

	public validate(): Promise<void> {
		throw new Error("Method not implemented.");
	}

	public close(): Promise<void> {
		throw new Error("Method not implemented.");
	}

	public getRepository<Entity>(
		entity: any,
	): BaseRepository<Entity, void, void> {
		return new TestRepository(this.entityManager, this.logger, entity);
	}
}
