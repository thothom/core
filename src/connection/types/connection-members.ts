import { MetadataManager, CompassError, Logger } from "../..";
import { BaseConnectionOptions } from "./connection-options";

export interface ConnectionMembers<EntityExtraData, ColumnExtraData> {
	options: BaseConnectionOptions;
	metadataManager: MetadataManager<EntityExtraData, ColumnExtraData>;
	errorThrower: CompassError;
	logger: Logger;
}
