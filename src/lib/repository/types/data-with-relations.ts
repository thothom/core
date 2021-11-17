import { SingleSaveData } from "./save-conditions";

export interface DataWithRelations<Entity> {
	entity: any;
	data: SingleSaveData<Entity>;
	relations: Array<DataWithRelations<Entity>>;
}
