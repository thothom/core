import { Connection } from "../../lib/connection";
import { Repository } from "../../lib/connection/types/repository";

export class LocalConnection extends Connection<any, any> {
	public getRepository<Entity>(_entity: Entity) {
		return {} as Repository<Entity>;
	}
}
