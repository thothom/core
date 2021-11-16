import { Logger } from "../logger";
import { EntityManager } from "../entity-manager";
import { BaseRepository } from "../repository";
import { BaseConnectionOptions } from "./types/connection-options";
import { CustomClass } from "../entity-manager/types/metadata-type";
import { DEFAULT_CONNECTION_NAME } from "../../config";
import { loadOptions } from "../utils/cli/load-options";
import { loadEntities } from "../utils/cli/load-entities";

export abstract class BaseConnection<
	DatabaseConfig = any,
	EntityExtraMetadata = any,
	ColumnExtraMetadata = any,
	IndexExtraMetadata = any,
> {
	/**
	 * Properties
	 */

	public options: Omit<
		BaseConnectionOptions<DatabaseConfig>,
		"entities" | "entitiesDir"
	>;

	private readonly internalOptions: BaseConnectionOptions<DatabaseConfig>;

	public name: string;

	public entities: Array<any>;

	public entityManager: EntityManager<
		EntityExtraMetadata,
		ColumnExtraMetadata,
		IndexExtraMetadata
	>;

	public logger: Logger;

	/**
	 * The connection needs to load the entities before do anything,
	 * so this prop exists to plugins creators verify if the user
	 * has not called the `.load()` and throw an error.
	 */
	protected isLoaded: boolean;

	/**
	 * Constructor
	 */

	public constructor(
		pluginName: string,
		options?: BaseConnectionOptions<DatabaseConfig>,
	) {
		this.internalOptions = loadOptions(pluginName, options);

		this.isLoaded = false;
	}

	public async load() {
		const { entities, entitiesDir, ...options } = this.internalOptions;

		this.options = options;

		this.name = this.options.name || DEFAULT_CONNECTION_NAME;

		this.entities = [...(entities || []), ...(await loadEntities(entitiesDir))];

		this.logger = new Logger(this.name, this.options.logging);

		this.entityManager = new EntityManager<
			EntityExtraMetadata,
			ColumnExtraMetadata
		>({
			logger: this.logger,
			connectionOptions: this.options,
			entities: this.entities,
		});

		this.isLoaded = true;

		return this;
	}

	/**
	 * Abstract Methods
	 */

	public abstract connect(): Promise<this>;

	public abstract close(): Promise<void>;

	public abstract getRepository<Entity>(
		entity: CustomClass,
	): BaseRepository<Entity, EntityExtraMetadata, ColumnExtraMetadata>;
}
