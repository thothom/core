import { Logger } from "../logger";
import { MetadataManager } from "../metadata-manager";
import { Repository } from "./types/repository";
import { BaseConnectionOptions } from "./types/connection-options";
import { ConnectionMembers } from "./types/connection-members";

type DefaultExtraMetadata = Record<string, any>;

export abstract class Connection<
	EntityExtraData = DefaultExtraMetadata,
	ColumnExtraData = DefaultExtraMetadata,
> {
	protected readonly name: ConnectionMembers<
		EntityExtraData,
		ColumnExtraData
	>["name"];

	protected readonly options: ConnectionMembers<
		EntityExtraData,
		ColumnExtraData
	>["options"];

	protected readonly metadataManager: ConnectionMembers<
		EntityExtraData,
		ColumnExtraData
	>["metadataManager"];

	protected readonly logger: ConnectionMembers<
		EntityExtraData,
		ColumnExtraData
	>["logger"];

	public constructor(options: BaseConnectionOptions) {
		this.name = options.name || "Default";

		this.options = options;

		this.logger = new Logger(this.name, options.logging);

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
