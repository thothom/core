/* eslint-disable @typescript-eslint/sort-type-union-intersection-members */

export type ThothErrorCode =
	/**
	 * Etc
	 */
	| "UNKNOWN"
	/**
	 * Params
	 */
	| "INVALID_PARAM"
	| "INVALID_PARAM_TYPE"
	| "MISSING_PARAM"
	/**
	 * Execution order
	 */
	| "INVALID_EXECUTION_ORDER"
	/**
	 * Decorators
	 */
	| "MISSING_DECORATOR"
	| "DUPLICATED_ENTITY"
	| "DUPLICATED_COLUMN"
	/**
	 * Entity
	 */
	| "ENTITY_ERROR"
	/**
	 * Column
	 */
	| "COLUMN_ERROR"
	/**
	 * Automation
	 */
	| "AUTOMATION_FAILED"
	/**
	 * Plugin
	 */
	| "NOT_IMPLEMENTED"
	/**
	 * Execution order
	 */
	| "INVALID_EXECUTION_ORDER"
	/**
	 * Dependencies
	 */
	| "MISSING_DEPENDENCY"
	/**
	 * Database
	 */
	| "OPERATION_FAILED";
