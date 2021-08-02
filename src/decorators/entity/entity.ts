import { metadataManager } from "../../metadata-manager";
import { EntityMetadataEnum } from "../../enums/entity-metadata";
import { BaseClass } from "../../types/class";
import { EntityOptions } from "../types/entity-options";
import { getName } from "./helpers/get-name";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Entity = (nameOrOptions?: EntityOptions | string) => {
	return (entity: BaseClass) => {
		const name = getName({
			target: entity,
			nameOrOptions,
		});

		Reflect.defineMetadata(EntityMetadataEnum.NAME, name, entity);

		metadataManager.addEntity(entity);
	};
};
