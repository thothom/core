import { Connection } from "../../lib/connection";
import { Repository } from "../../lib/repository";

export class TestConnection extends Connection<any, any> {
	public getRepository<Entity>(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_entity: Entity,
	): Repository<Entity, void, void> {
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
