import { EntityMetadataEnum } from "../../enums/entity-metadata";

export const getEntityMetadata = (entity: any) => {
	const getMetadata = (key: EntityMetadataEnum) =>
		Reflect.getMetadata(key, entity);

	return {
		name: getMetadata(EntityMetadataEnum.NAME),
	};
};
