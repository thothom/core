import { MetadataManager, Logger } from "../..";
import { BaseConnectionOptions } from "./connection-options";

export interface ConnectionMembers<EntityExtraData, ColumnExtraData> {
	name: string;
	options: BaseConnectionOptions;
	metadataManager: MetadataManager<EntityExtraData, ColumnExtraData>;
	logger: Logger;
}
