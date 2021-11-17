import { SingleSaveData } from "./save-conditions";

export interface DataWithRelations<Entity = any> {
	entity: any;
	data: SingleSaveData<Entity>;
	relations: Array<DataWithRelations<Entity>>;
}
