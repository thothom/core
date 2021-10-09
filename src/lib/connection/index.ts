import { Logger } from "../logger";
import { EntityManager } from "../entity-manager";
import { Repository } from "../repository";
import { BaseConnectionOptions } from "./types/connection-options";

type DefaultExtraMetadata = Record<string, any>;

export abstract class Connection<
	DatabaseConnectionConfig = void,
	EntityExtraData = DefaultExtraMetadata,
	ColumnExtraData = DefaultExtraMetadata,
> {
	/**
	 * Properties
	 */

	private readonly _name: string;

	private readonly _options: BaseConnectionOptions<DatabaseConnectionConfig>;

	private readonly _entityManager: EntityManager<
		EntityExtraData,
		ColumnExtraData
	>;

	private readonly _logger: Logger;

	/**
	 * Getters
	 */

	protected get name() {
		return this._name;
	}

	protected get options() {
		return this._options;
	}

	protected get entityManager() {
		return this._entityManager;
	}

	protected get logger() {
		return this._logger;
	}

	/**
	 * Constructor
	 */

	public constructor(options: BaseConnectionOptions<DatabaseConnectionConfig>) {
		this._name = options.name || "Default";

		this._options = options;

		this._logger = new Logger(this._name, options.logging);

		this._entityManager = new EntityManager<EntityExtraData, ColumnExtraData>({
			logger: this._logger,
			connectionOptions: this._options,
		});
	}

	/**
	 * Methods
	 */

	public abstract getRepository<Entity>(
		entity: Entity,
	): Repository<Entity, EntityExtraData, ColumnExtraData>;
}
