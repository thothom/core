import { Connection } from "../../lib/connection";
import { Repository } from "../../lib/repository";

export class TestConnection extends Connection<any, any> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public getRepository<Entity>(_entity: Entity): Repository<Entity> {
		throw new Error("Method not implemented.");
	}

	public override get name() {
		return super.name;
	}

	public override get options() {
		return super.options;
	}

	public override get metadataManager() {
		return super.metadataManager;
	}

	public override get logger() {
		return super.logger;
	}
}
