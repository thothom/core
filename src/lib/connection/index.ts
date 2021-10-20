import { Logger } from "../logger";
import { EntityManager } from "../entity-manager";
import { BaseRepository } from "../repository";
import { BaseConnectionOptions } from "./types/connection-options";
import { CustomClass } from "../entity-manager/types/metadata-type";

export abstract class Connection<
	DatabaseConfig = any,
	EntityExtraData = any,
	ColumnExtraData = any,
> {
	/**
	 * Properties
	 */

	private readonly _name: string;

	private readonly _options: BaseConnectionOptions<DatabaseConfig>;

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

	public constructor(options: BaseConnectionOptions<DatabaseConfig>) {
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

	public abstract connect(): Promise<void>;

	public abstract getRepository<Entity>(
		entity: CustomClass,
	): BaseRepository<Entity, EntityExtraData, ColumnExtraData>;
}
