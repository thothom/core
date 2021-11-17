import "reflect-metadata";

/**
 * ---------------------------------------------------------------------------
 *
 * Decorators
 *
 * ---------------------------------------------------------------------------
 */

export * from "./lib/decorators/columns/column";
export * from "./lib/decorators/columns/count-column";
export * from "./lib/decorators/columns/primary-column";
export * from "./lib/decorators/columns/primary-generated-column";
export * from "./lib/decorators/columns/delete-date-column";
export * from "./lib/decorators/columns/insert-date-column";
export * from "./lib/decorators/columns/update-date-column";
export * from "./lib/decorators/entities/entity";
export * from "./lib/decorators/entities/sub-entity";
export * from "./lib/decorators/relations/one-to-one";
export * from "./lib/decorators/relations/many-to-one";
export * from "./lib/decorators/relations/one-to-many";
export * from "./lib/decorators/index";

/**
 * ---------------------------------------------------------------------------
 *
 * Entity Manager
 *
 * ---------------------------------------------------------------------------
 */

export * from "./lib/entity-manager";

/**
 * ---------------------------------------------------------------------------
 *
 * Connection
 *
 * ---------------------------------------------------------------------------
 */

export * from "./lib/connection";
export * from "./lib/connection/types/connection-options";

/**
 * ---------------------------------------------------------------------------
 *
 * Repository
 *
 * ---------------------------------------------------------------------------
 */

export * from "./lib/repository";
export * from "./lib/repository/types/query-options";

/**
 * FindOperators
 */

export * from "./lib/repository/operators/find/base";

export * from "./lib/repository/operators/find/between";
export * from "./lib/repository/operators/find/ends-with";
export * from "./lib/repository/operators/find/exist";
export * from "./lib/repository/operators/find/in";
export * from "./lib/repository/operators/find/includes";
export * from "./lib/repository/operators/find/is-null";
export * from "./lib/repository/operators/find/less-than";
export * from "./lib/repository/operators/find/less-than-or-equal";
export * from "./lib/repository/operators/find/like";
export * from "./lib/repository/operators/find/more-than";
export * from "./lib/repository/operators/find/more-than-or-equal";
export * from "./lib/repository/operators/find/not";
export * from "./lib/repository/operators/find/starts-with";

/**
 * SaveOperators
 */

export * from "./lib/repository/operators/save/base";

export * from "./lib/repository/operators/save/append";
export * from "./lib/repository/operators/save/if-not-exists";
export * from "./lib/repository/operators/save/max";
export * from "./lib/repository/operators/save/min";
export * from "./lib/repository/operators/save/minus";
export * from "./lib/repository/operators/save/plus";
export * from "./lib/repository/operators/save/pop";
export * from "./lib/repository/operators/save/remove";

/**
 * ---------------------------------------------------------------------------
 *
 * Error
 *
 * ---------------------------------------------------------------------------
 */

export * from "./lib/error";
export * from "./lib/types/error-code";

/**
 * ---------------------------------------------------------------------------
 *
 * Logger
 *
 * ---------------------------------------------------------------------------
 */

export * from "./lib/logger";
export * from "./lib/logger/types/log-level";

/**
 * ---------------------------------------------------------------------------
 *
 * Types
 *
 * ---------------------------------------------------------------------------
 */

export * from "./lib/types/entity";
export * from "./lib/types/class-type";
export * from "./lib/types/extra-metadata";

/**
 * FindOptions
 */

export * from "./lib/repository/types/find-conditions";
export * from "./lib/repository/types/find-options";

/**
 * SaveOptions
 */

export * from "./lib/repository/types/save-conditions";

/**
 * ---------------------------------------------------------------------------
 *
 * Utils
 *
 * ---------------------------------------------------------------------------
 */

/**
 * Metadata
 */

export * from "./lib/utils/metadata-util";

/**
 * Operators
 */

export * from "./lib/utils/operators/is-operator";
export * from "./lib/utils/operators/is-find-operator";
export * from "./lib/utils/operators/is-save-operator";

/**
 * Globals
 */

export * from "./lib/utils/globals/get-global-connection";
export * from "./lib/utils/globals/get-global-repository";
export * from "./lib/utils/globals/set-global-connection";

/**
 * CLI
 */

export * from "./lib/utils/cli/create-dot-symb-dir";
export * from "./lib/utils/cli/glob";
export * from "./lib/utils/cli/load-entities";
export * from "./lib/utils/cli/load-options";
