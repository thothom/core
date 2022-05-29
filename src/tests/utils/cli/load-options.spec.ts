/* eslint-disable sonarjs/no-duplicate-string */
import { ThothError } from "../../../lib/error";

import { internalLoadOptions } from "../../../lib/utils/cli/load-options/internal";

import type { BaseConnectionOptions } from "../../../lib/connection/types/connection-options";

describe("Utils > CLI > loadOptions", () => {
	/*
	 * Random lib that is installed in this project
	 *
	 * It is used because this function has a "isPackageInstalled"
	 * validation for the plugin, so we have to fake it
	 */
	const pluginName = "@techmmunity/utils";
	const options: BaseConnectionOptions = {
		plugin: pluginName,
	};

	class FooEntity {}

	const existsSync = jest.fn();
	const internalRequire = jest.fn();

	const loadOptions = (
		plugin: string,
		possiblyConfig?: BaseConnectionOptions,
		isCliCall?: boolean,
	) =>
		internalLoadOptions({
			pluginName: plugin,
			possiblyConfig,
			isCliCall,
			existsSync,
			internalRequire,
		});

	describe("with all valid options param", () => {
		it("should return options config (with entities)", () => {
			let result;

			const testOptions = {
				...options,
				entities: [FooEntity],
			};

			try {
				result = loadOptions(pluginName, testOptions);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(result).toStrictEqual(testOptions);
		});

		it("should return options config (with entitiesDir)", () => {
			let result;

			const testOptions = {
				...options,
				entitiesDir: ["entities/**/dir/*.ts"],
			};

			try {
				result = loadOptions(pluginName, testOptions);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(result).toStrictEqual(testOptions);
		});
	});

	describe("with all valid config file", () => {
		it("should return config file options (with entities)", () => {
			let result;

			const testOptions = {
				...options,
				entities: [FooEntity],
			};

			existsSync.mockReturnValueOnce(true);
			internalRequire.mockReturnValueOnce(testOptions);

			try {
				result = loadOptions(pluginName);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(1);
			expect(internalRequire).toBeCalledTimes(1);
			expect(result).toStrictEqual(testOptions);
		});

		it("should return options config (with entitiesDir)", () => {
			let result;

			const testOptions = {
				...options,
				entitiesDir: ["entities/**/dir/*.ts"],
			};

			existsSync.mockReturnValueOnce(true);
			internalRequire.mockReturnValueOnce(testOptions);

			try {
				result = loadOptions(pluginName);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(1);
			expect(internalRequire).toBeCalledTimes(1);
			expect(result).toStrictEqual(testOptions);
		});
	});

	describe("with invalid params", () => {
		it("should throw error (with invalid options type)", () => {
			let result;

			existsSync.mockReturnValueOnce(false);

			try {
				result = loadOptions(pluginName, "not-array" as any);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(result instanceof ThothError).toBeTruthy();
			expect(result).toStrictEqual(
				new ThothError({
					code: "INVALID_PARAM",
					origin: "THOTHOM",
					message: "Missing config file",
					details: [
						"Missing config file: thothom.config.js",
						"You can install the cli `@thothom/cli` and use `npx thothom gen:config` to automatic generate a config file",
					],
				}),
			);
		});

		it("should throw error (without options and config file)", () => {
			let result;

			existsSync.mockReturnValueOnce(false);

			try {
				result = loadOptions(pluginName);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(1);
			expect(internalRequire).toBeCalledTimes(0);
			expect(result instanceof ThothError).toBeTruthy();
			expect(result).toStrictEqual(
				new ThothError({
					code: "INVALID_PARAM",
					origin: "THOTHOM",
					message: "Missing config",
					details: [
						"Missing config options and config file",
						"You can install the cli `@thothom/cli` and use `npx thothom gen:config` to automatic generate a config file, or specify the options at the Connection class constructor",
					],
				}),
			);
		});
	});

	describe("with invalid plugin and is cli call (no param)", () => {
		it("should throw error", () => {
			let result;

			const testOptions = {
				...options,
				entities: [FooEntity],
			};

			try {
				result = loadOptions(undefined as any, testOptions, true);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(result instanceof ThothError).toBeTruthy();
			expect(result).toStrictEqual(
				new ThothError({
					code: "INVALID_PARAM",
					origin: "THOTHOM",
					message: "Missing config",
					details: ["Missing config: plugin"],
				}),
			);
		});
	});

	describe("with invalid plugin and is cli call (not installed)", () => {
		it("should throw error", () => {
			let result;

			const testOptions = {
				...options,
				entities: [FooEntity],
			};

			try {
				result = loadOptions("not-installed-plugin", testOptions, true);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(result instanceof ThothError).toBeTruthy();
			expect(result).toStrictEqual(
				new ThothError({
					code: "MISSING_DEPENDENCY",
					origin: "THOTHOM",
					message: "Missing dependency",
					details: ["Plugin not found: not-installed-plugin"],
				}),
			);
		});
	});

	describe("with invalid entities", () => {
		it("should throw error (without entities and entitiesDir)", () => {
			let result;

			const testOptions = {
				...options,
			};

			try {
				result = loadOptions(pluginName, testOptions);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(result instanceof ThothError).toBeTruthy();
			expect(result).toStrictEqual(
				new ThothError({
					code: "INVALID_PARAM",
					origin: "THOTHOM",
					message: "Missing config",
					details: ["Missing config: entities OR entitiesDir"],
				}),
			);
		});

		it("should throw error (with not-array entities)", () => {
			let result;

			const testOptions = {
				...options,
				entities: "not-array" as any,
			};

			try {
				result = loadOptions(pluginName, testOptions);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(result instanceof ThothError).toBeTruthy();
			expect(result).toStrictEqual(
				new ThothError({
					code: "INVALID_PARAM",
					origin: "THOTHOM",
					message: "Invalid entities",
					details: ["`entities` option must be an array of entities"],
				}),
			);
		});

		it("should throw error (with entities array of not-entity)", () => {
			let result;

			const testOptions = {
				...options,
				entities: ["not-array"],
			};

			try {
				result = loadOptions(pluginName, testOptions);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(result instanceof ThothError).toBeTruthy();
			expect(result).toStrictEqual(
				new ThothError({
					code: "INVALID_PARAM",
					origin: "THOTHOM",
					message: "Invalid entities",
					details: ["`entities` option must be an array of entities"],
				}),
			);
		});

		it("should throw error (with not-array entitiesDir)", () => {
			let result;

			const testOptions = {
				...options,
				entitiesDir: "not-array" as any,
			};

			try {
				result = loadOptions(pluginName, testOptions);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(result instanceof ThothError).toBeTruthy();
			expect(result).toStrictEqual(
				new ThothError({
					code: "INVALID_PARAM",
					origin: "THOTHOM",
					message: "Invalid entities",
					details: [
						"`entitiesDir` option must be an array of strings (entities paths)",
					],
				}),
			);
		});

		it("should throw error (with entitiesDir array of not-string)", () => {
			let result;

			const testOptions = {
				...options,
				entitiesDir: [FooEntity as any],
			};

			try {
				result = loadOptions(pluginName, testOptions);
			} catch (err) {
				result = err;
			}

			expect(existsSync).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(result instanceof ThothError).toBeTruthy();
			expect(result).toStrictEqual(
				new ThothError({
					code: "INVALID_PARAM",
					origin: "THOTHOM",
					message: "Invalid entities",
					details: [
						"`entitiesDir` option must be an array of strings (entities paths)",
					],
				}),
			);
		});
	});
});
