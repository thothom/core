import { CompassError } from "../error";
import { Logger } from "../logger";
import { MetadataManager } from "../metadata-manager";
import { Repository } from "./types/repository";
import { BaseConnectionOptions } from "./types/connection-options";
import { ConnectionMembers } from "./types/connection-members";

export abstract class Connection<EntityExtraData, ColumnExtraData> {
	protected readonly options: ConnectionMembers<
		EntityExtraData,
		ColumnExtraData
	>["options"];

	protected readonly metadataManager: ConnectionMembers<
		EntityExtraData,
		ColumnExtraData
	>["metadataManager"];

	protected readonly errorThrower: ConnectionMembers<
		EntityExtraData,
		ColumnExtraData
	>["errorThrower"];

	protected readonly logger: ConnectionMembers<
		EntityExtraData,
		ColumnExtraData
	>["logger"];

	public constructor(options: BaseConnectionOptions) {
		this.options = options;

		this.errorThrower = new CompassError();

		this.logger = new Logger(options.logging);

		/**
		 * The MetadataManager [[ !!! MUST BE !!! ]] the last one to be defined
		 */
		this.metadataManager = new MetadataManager<
			EntityExtraData,
			ColumnExtraData
			/**
			 * It's necessary to use `as any`, because TypeScript doesn't understand
			 * that the methods are accessible, besides they are protected
			 */
		>(this as any);
	}

	public abstract getRepository<Entity>(entity: Entity): Repository<Entity>;
}
