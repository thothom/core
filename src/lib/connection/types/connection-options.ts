import { LogLevel } from "../../logger/types/log-level";
import { CustomClass } from "../../metadata-manager/types/metadata-type";
import { NamingPatterns } from "../../utils/format-naming-pattern/types/naming-patterns";

export interface BaseConnectionOptions {
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
	 * **MINIMUM:** [DEFAULT] Only errors
	 *
	 * **ALL:** Error and logs
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
	 * **INFO:** Compass, connection, and general things status. Rarely used.
	 */
	logging?: LogLevel;

	/**
	 * Maximum number of milliseconds query should be executed before be canceled.
	 */
	timeout?: number;

	/**
	 * Nro of retries
	 *
	 * // TODO Add Detailed Retry Policy
	 */
	retries?: number;

	/**
	 * Naming pattern to be used to name ENTITIES, COLUMNS, etc
	 */
	namingPattern?: {
		entity?: {
			/**
			 * Pattern to convert from CODE to DATABASE
			 */
			database: NamingPatterns;
			/**
			 * Pattern to convert from DATABASE to CODE
			 */
			code: NamingPatterns;
		};
		column?: {
			/**
			 * Pattern to convert from CODE to DATABASE
			 */
			database: NamingPatterns;
			/**
			 * Pattern to convert from DATABASE to CODE
			 */
			code: NamingPatterns;
		};
	};

	/**
	 * Prefix to be added / removed from ENTITY, COLUMN, etc name
	 *
	 * Works FROM code TO database. Ex: An class `ExampleClass`
	 * with prefix `Prefix` will be `PrefixExampleClass` in the database
	 *
	 * **Execution order:** Remove -> Add
	 *
	 * This prefix must follow the same naming pattern that you are
	 * using to name your classes. The conversion to the namingPattern
	 * specified at this connection config will be execute **AFTER** the
	 * prefix addition / remotion
	 *
	 * Ex:
	 * ```ts
	 * class EntityPascalCase {
	 *   ...
	 * }
	 *
	 * const connectionOptions = {
	 *   prefix: {
	 *     entity: {
	 *       add: "PrefixFollowPascalCasePattern"
	 *     }
	 *   }
	 * }
	 * ```
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
	 * This suffix must follow the same naming pattern that you are
	 * using to name your classes. The conversion to the namingPattern
	 * specified at this connection config will be execute **AFTER** the
	 * suffix addition / remotion
	 *
	 * Ex:
	 * ```ts
	 * class EntityPascalCase {
	 *   ...
	 * }
	 *
	 * const connectionOptions = {
	 *   suffix: {
	 *     entity: {
	 *       add: "SuffixFollowPascalCasePattern"
	 *     }
	 *   }
	 * }
	 * ```
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
}
