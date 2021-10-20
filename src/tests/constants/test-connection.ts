/* eslint-disable @typescript-eslint/no-unused-vars */

import { Connection } from "../../lib/connection";
import { CustomClass } from "../../lib/entity-manager/types/metadata-type";
import { BaseRepository } from "../../lib/repository";

export class TestConnection extends Connection {
	public connect(): Promise<void> {
		throw new Error("Method not implemented.");
	}

	public getRepository<Entity>(
		_entity: CustomClass,
	): BaseRepository<Entity, void, void> {
		throw new Error("Method not implemented.");
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
