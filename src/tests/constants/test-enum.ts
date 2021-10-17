/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/naming-convention */

/**
 * This "enum" must be faked, so it have the Object type instead
 * String or Number, which only occur in development
 * (in production it has the type Object)
 *
 * Alert: Currently (0.0.10) both types will work, so the enum
 * can be in the same file or in a different file, but we will always
 * handle it as the enum is on a different file.
 */

/**
 * -------------------------------------------------
 */

export const TestStringEnum = {
	FOO: "FOO",
	BAR: "BAR",
};

export type TestStringEnum = typeof TestStringEnum;

/**
 * -------------------------------------------------
 */

export const TestNumberEnum = {
	FOO: 1,
	BAR: 2,
};

export type TestNumberEnum = typeof TestNumberEnum;

/**
 * -------------------------------------------------
 */

export const TestUnknownEnum = {
	FOO: undefined,
	BAR: undefined,
};

export type TestUnknownEnum = typeof TestUnknownEnum;
