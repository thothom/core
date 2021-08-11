import { ColumnMetadata } from "../../../entity-manager/types/column-metadata";
import { EntityMetadata } from "../../../entity-manager/types/entity-metadata";

export interface DefineAllEntityMetadataParams {
	entity: any;
	metadata: EntityMetadata;
}

export interface DefineEntityMetadataParams {
	metadataKey: string;
	metadataValue: any;
	entity: any;
}

export interface GetAllEntityMetadataParams {
	entity: any;
}

export interface GetEntityMetadataParams {
	metadataKey: string;
	entity: any;
}

export interface AddColumnMetadataToEntityParams {
	metadata: ColumnMetadata;
	entity: any;
}
