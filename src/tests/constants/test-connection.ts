import { Connection } from "../../lib/connection";
import { Repository } from "../../lib/repository";

export class TestConnection extends Connection<any, any> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public getRepository<Entity>(_entity: Entity): Repository<Entity> {
		throw new Error("Method not implemented.");
	}
}
