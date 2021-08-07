import { Logger } from "../logger";
import { MetadataManager } from "../metadata-manager";
import { Repository } from "./types/repository";
import { BaseConnectionOptions } from "./types/connection-options";

type DefaultExtraMetadata = Record<string, any>;

export abstract class Connection<
	EntityExtraData = DefaultExtraMetadata,
	ColumnExtraData = DefaultExtraMetadata,
> {
	public readonly name: string;

	public readonly options: BaseConnectionOptions;

	public readonly metadataManager: MetadataManager<
		EntityExtraData,
		ColumnExtraData
	>;

	public readonly logger: Logger;

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
