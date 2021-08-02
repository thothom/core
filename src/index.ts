import "reflect-metadata";

/**
 * ---------------------------------------------------------------------------
 *
 * Decorators
 *
 * ---------------------------------------------------------------------------
 */

export * from "./decorators/column";
export * from "./decorators/entity/entity";
export * from "./decorators/primary-column";

/**
 * ---------------------------------------------------------------------------
 *
 * Enums
 *
 * ---------------------------------------------------------------------------
 */

/**
 * Metadata Enums
 */

export * from "./enums/columns-metadata";
export * from "./enums/entity-metadata";

/**
 * ---------------------------------------------------------------------------
 *
 * Metadata Manager
 *
 * ---------------------------------------------------------------------------
 */

export * from "./metadata-manager";

/**
 * ---------------------------------------------------------------------------
 *
 * Types
 *
 * ---------------------------------------------------------------------------
 */

export * from "./types/connection";
export * from "./types/repository";

/**
 * ---------------------------------------------------------------------------
 *
 * Utils
 *
 * ---------------------------------------------------------------------------
 */

/**
 * Format Naming Pattern
 */

export * from "./utils/format-naming-pattern";
export * from "./utils/format-naming-pattern/get-glue";
export * from "./utils/format-naming-pattern/detect-case";

/**
 * Get Name
 */

export * from "./utils/get-name/get-column-name";
export * from "./utils/get-name/get-entity-name";

/**
 * Metadata
 */

export * from "./utils/metadata/get-column-metadata";
export * from "./utils/metadata/get-entity-metadata";
export * from "./utils/metadata/is-metadata-type";
