import { LogLevel } from "../../logger/types/log-level";
import { CustomClass } from "../../entity-manager/types/metadata-type";
import { NamingStrategy } from "../../utils/format-naming-strategy/types/naming-strategy";

export interface BaseConnectionOptions<DatabaseConfig = any> {
	/**
	 * Connection name, to use in case of multiple connections
	 */
	name?: string;

	/**
	 * Array of entities of this connection
	 */
	entities: Array<CustomClass>;

	/**
	 * Logging level, determines which information should be logged
	 *
	 * ### Categories:
	 *
	 * You can use pre-defined categories to specify the logging level
	 *
	 * **MINIMUM:** Only errors
	 *
	 * **ALL:** [DEFAULT] Error, warns and logs
	 *
	 * **ALL_INTERNAL:** **ALL of all**, for internal use and debugging
	 *
	 * ### Values:
	 *
	 * Or you can use an array of values, to determine which logs do you want to log
	 *
	 * The allowed values for the array are:
	 *
	 * **ERROR:** Errors
	 *
	 * **LOG:** Logs for queries results, database operations, etc
	 *
	 * **DEBUG:** Logs EVERYTHING done by the lib
	 *
	 * **INFO:** Symbiosis, connection, and general things status. Rarely used.
	 *
	 * **WARN:** Alerts that the system cannot determine if it's wrong use of
	 * the lib or just the expected functioning.
	 */
	logging?: LogLevel;

	/**
	 * Maximum number of milliseconds query should be executed before be canceled.
	 */
	timeout?: number;

	/**
	 * Naming strategy to be used to name ENTITIES, COLUMNS, etc
	 *
	 * It convert the CLASS or PROPERTY name to the case specified
	 *
	 * Ex:
	 * ```ts
	 * // If you have the class:
	 * class ExampleEntity {}
	 *
	 * // And the config are:
	 * namingStrategy: "snake_case"
	 *
	 * // In the database will be:
	 * "example_entity"
	 * ```
	 *
	 * ---
	 *
	 * ## ALERT: The naming strategy are applied **AFTER** the prefix and suffix
	 */
	namingStrategy?: {
		entity?: NamingStrategy;
		column?: NamingStrategy;
	};

	/**
	 * Prefix to be added / removed from ENTITY, COLUMN, etc name
	 *
	 * Works FROM code TO database. Ex: An class `ExampleClass`
	 * with prefix `Prefix` will be `PrefixExampleClass` in the database
	 *
	 * **Execution order:** Remove -> Add
	 *
	 * ## ALERT: The prefix is applied **BEFORE** the naming strategy
	 *
	 * ## ALERT: Prefix isn't applied to sub-entities
	 */
	prefix?: {
		entity?: {
			/**
			 * Prefix to be ADDED (from CODE to DATABASE)
			 */
			add?: string;
			/**
			 * Prefix to be REMOVED (from CODE to DATABASE)
			 */
			remove?: string;
		};
		column?: {
			/**
			 * Prefix to be ADDED (from CODE to DATABASE)
			 */
			add?: string;
			/**
			 * Prefix to be REMOVED (from CODE to DATABASE)
			 */
			remove?: string;
		};
	};

	/**
	 * Suffix to be added / removed from ENTITY, COLUMN, etc name
	 *
	 * Works FROM code TO database. Ex: An class `ExampleClass`
	 * with prefix `Suffix` will be `ExampleClassSuffix` in the database
	 *
	 * **Execution order:** Remove -> Add
	 *
	 * ## ALERT: The suffix is applied **BEFORE** the naming strategy
	 *
	 * ## ALERT: Prefix isn't applied to sub-entities
	 */
	suffix?: {
		entity?: {
			/**
			 * Suffix to be ADDED (from CODE to DATABASE)
			 */
			add?: string;
			/**
			 * Suffix to be REMOVED (from CODE to DATABASE)
			 */
			remove?: string;
		};
		column?: {
			/**
			 * Suffix to be ADDED (from CODE to DATABASE)
			 */
			add?: string;
			/**
			 * Suffix to be REMOVED (from CODE to DATABASE)
			 */
			remove?: string;
		};
	};

	/**
	 * Time Zone used to Auto Generated Dates
	 *
	 * List with all time zones available:
	 * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
	 *
	 * **DEFAULT:** UTC
	 */
	timeZone?: string;

	/**
	 * Specific options to the database
	 */
	databaseConfig?: DatabaseConfig;
}
