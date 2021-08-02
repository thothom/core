import { ColumnMetadataEnum } from "../../enums/columns-metadata";

export const getColumnMetadata = (entity: any, columnName: string) => {
	const getMetadata = (key: ColumnMetadataEnum) =>
		Reflect.getMetadata(key, entity.prototype, columnName);

	return {
		name: getMetadata(ColumnMetadataEnum.NAME),
		type: getMetadata(ColumnMetadataEnum.TYPE),
		isArray: getMetadata(ColumnMetadataEnum.IS_ARRAY),
		primary: getMetadata(ColumnMetadataEnum.PRIMARY),
	};
};
