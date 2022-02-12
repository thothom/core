/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BaseConnection } from "../../lib/connection";
import type { BaseRepository } from "../../lib/repository";

import { TestRepository } from "./test-repository";

import type { BaseConnectionOptions } from "../../lib/connection/types/connection-options";

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

	public getRepository<Entity>(entity: any): BaseRepository<Entity> {
		return new TestRepository(this.entityManager, this.logger, entity);
	}
}
