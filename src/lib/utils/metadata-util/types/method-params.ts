import { EntityMetadata } from "../../../metadata-manager/types/metadata";

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
