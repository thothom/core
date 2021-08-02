import { BaseClass } from "./class";
import { NamingPatterns } from "./naming-pattern";
import { Repository } from "./repository";

export interface BaseConnectionOptions {
	/**
	 * Maximum number of milliseconds query should be executed before be canceled.
	 */
	timeout?: number;

	/**
	 * Nro of retries
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
	 * Suffix to be added / removed from ENTITY, COLUMN,
	 * etc name (from CODE to DATABASE)
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

	/**
	 * Prefix to be added / removed from ENTITY, COLUMN,
	 * etc name (from CODE to DATABASE)
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
}

export interface Connection {
	constructor: (options: BaseConnectionOptions) => void;
	getRepository: <Entity = any>(
		entity: BaseClass,
	) => Promise<Repository<Entity>> | Repository<Entity>;
}
