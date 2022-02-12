import { isEmptyArray } from "@techmmunity/utils";

import { DEFAULT_CONNECTION_NAME } from "../../config";
import { EntityManager } from "../entity-manager";
import { SymbiosisError } from "../error";
import { Logger } from "../logger";
import type { BaseRepository } from "../repository";

import { loadEntities } from "../utils/cli/load-entities";
import { loadOptions } from "../utils/cli/load-options";

import type { CustomClass } from "../entity-manager/types/metadata-type";
import type { BaseExtraMetadata } from "../types/extra-metadata";
import type { BaseConnectionOptions } from "./types/connection-options";

export abstract class BaseConnection<
	DatabaseConfig = any,
	ExtraMetadata extends BaseExtraMetadata = any,
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

	public entityManager: EntityManager<ExtraMetadata>;

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

	/**
	 * Load the entities and connection config
	 */
	public async load() {
		const { entities = [], entitiesDir, ...options } = this.internalOptions;

		this.options = options;

		this.name = this.options.name || DEFAULT_CONNECTION_NAME;

		const loadedEntities = await loadEntities(entitiesDir);

		this.entities = [...entities, ...loadedEntities];

		this.logger = new Logger(this.name, this.options.logging);

		this.entityManager = new EntityManager<ExtraMetadata>({
			logger: this.logger,
			connectionOptions: this.options,
			entities: this.entities,
		});

		this.isLoaded = true;

		return this;
	}

	/**
	 * Makes some basic validation in the connection data
	 */
	protected basicValidate() {
		if (isEmptyArray(this.entities)) {
			throw new SymbiosisError({
				code: "MISSING_PARAM",
				origin: "SYMBIOSIS",
				message: "Missing entities",
				details: [
					"No entities found",
					"`entities` option:",
					this.internalOptions.entities,
					"`entitiesDir` option:",
					this.internalOptions.entitiesDir,
				],
			});
		}
	}

	/**
	 * Abstract Methods
	 */

	/**
	 * Validate the connection data. Throw an error
	 * if something is wrong.
	 *
	 * Very useful to check if your schemas match with
	 * the database requirements.
	 *
	 * We recommend that you only call this method in
	 * development, so your system starts faster in
	 * production
	 */
	public abstract validate(): Promise<void>;

	/**
	 * Connect with the database
	 */
	public abstract connect(): Promise<this>;

	/**
	 * Close the connection with the database
	 */
	public abstract close(): Promise<void>;

	/**
	 * Makes a repository
	 *
	 * @param entity Entity of the repository
	 */
	public abstract getRepository<Entity>(
		entity: CustomClass,
	): BaseRepository<Entity, ExtraMetadata>;
}
