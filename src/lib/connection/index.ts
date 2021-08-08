import { Logger } from "../logger";
import { EntityManager } from "../entity-manager";
import { Repository } from "../repository";
import { BaseConnectionOptions } from "./types/connection-options";

type DefaultExtraMetadata = Record<string, any>;

export abstract class Connection<
	EntityExtraData = DefaultExtraMetadata,
	ColumnExtraData = DefaultExtraMetadata,
> {
	public readonly name: string;

	public readonly options: BaseConnectionOptions;

	public readonly metadataManager: EntityManager<
		EntityExtraData,
		ColumnExtraData
	>;

	public readonly logger: Logger;

	public constructor(options: BaseConnectionOptions) {
		this.name = options.name || "Default";

		this.options = options;

		this.logger = new Logger(this.name, options.logging);

		/**
		 * The EntityManager [[ !!! MUST BE !!! ]] the last one to be defined
		 */
		this.metadataManager = new EntityManager<
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
