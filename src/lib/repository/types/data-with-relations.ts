import { DatabaseEntity } from "../../types/database-entity";
import { SingleSaveData } from "./save-conditions";

export interface DataWithRelations {
	entity: any;
	data: SingleSaveData<DatabaseEntity>;
	relations: Array<DataWithRelations>;
}
