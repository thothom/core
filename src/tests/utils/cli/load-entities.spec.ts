/* eslint-disable sonarjs/no-duplicate-string */
import { MetadataUtil } from "../../..";
import { ThothError } from "../../../lib/error";

import { internalLoadEntities } from "../../../lib/utils/cli/load-entities/internal";

describe("Utils > CLI > loadEntities", () => {
	const getRootPath = jest.fn();
	const glob = jest.fn();
	const internalRequire = jest.fn();
	const isPackageInstalled = jest.fn();
	const createDotThothDir = jest.fn();
	const emit = jest.fn();

	class FooEntity {}
	class BarEntity {}
	class SubEntity {}

	const entitiesDirJs = ["foo/**/foo.js", "foo/**/bar.js"];
	const entitiesDirTs = ["foo/**/foo.ts", "foo/**/bar.ts"];

	const loadEntities = (entitiesDir?: Array<string>) =>
		internalLoadEntities({
			entitiesDir,
			getRootPath,
			glob,
			internalRequire,
			isPackageInstalled,
			createDotThothDir,
		});

	beforeAll(() => {
		MetadataUtil.defineEntityMetadata({
			metadataKey: "isSubEntity",
			metadataValue: true,
			entity: SubEntity,
		});
	});

	beforeEach(() => {
		getRootPath.mockImplementation(
			path => `root/path/${path.replace(/^\//, "")}`,
		);

		glob.mockImplementation(
			(path: string) =>
				new Promise(resolve =>
					resolve([path.replace(/\*\*/, "bar"), path.replace(/\*\*/, "foo")]),
				),
		);
	});

	describe("with no entitiesDir", () => {
		it("should return empty array", async () => {
			let result;

			try {
				result = await loadEntities();
			} catch (err) {
				result = err;
			}

			expect(glob).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(isPackageInstalled).toBeCalledTimes(0);
			expect(createDotThothDir).toBeCalledTimes(0);
			expect(emit).toBeCalledTimes(0);
			expect(result).toStrictEqual([]);
		});
	});

	describe("with empty array of entitiesDir", () => {
		it("should throw error", async () => {
			let result;

			try {
				result = await loadEntities([]);
			} catch (err) {
				result = err;
			}

			expect(glob).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(isPackageInstalled).toBeCalledTimes(0);
			expect(createDotThothDir).toBeCalledTimes(0);
			expect(emit).toBeCalledTimes(0);
			expect(result).toStrictEqual([]);
		});
	});

	describe("with only .js files", () => {
		it("should return only classes", async () => {
			let result;

			internalRequire.mockReturnValueOnce({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				FooEntity,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				SubEntity,
				notClass: "foo",
			});
			internalRequire.mockReturnValueOnce({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				BarEntity,
				shouldFilterThis: "bar",
			});
			internalRequire.mockReturnValueOnce({});
			internalRequire.mockReturnValueOnce({});

			try {
				result = await loadEntities(entitiesDirJs);
			} catch (err) {
				result = err;
			}

			expect(glob).toBeCalledTimes(entitiesDirJs.length);
			expect(internalRequire).toBeCalledTimes(entitiesDirJs.length * 2); // Because the mock implementation return 2x items
			expect(isPackageInstalled).toBeCalledTimes(0);
			expect(createDotThothDir).toBeCalledTimes(0);
			expect(emit).toBeCalledTimes(0);
			expect(result).toStrictEqual([FooEntity, BarEntity]);
		});

		it("should throw error (without classes exported from files)", async () => {
			let result;

			internalRequire.mockReturnValueOnce({
				notClass: "foo",
			});
			internalRequire.mockReturnValueOnce({
				shouldFilterThis: "bar",
			});
			internalRequire.mockReturnValueOnce({});
			internalRequire.mockReturnValueOnce({});

			try {
				result = await loadEntities(entitiesDirJs);
			} catch (err) {
				result = err;
			}

			expect(glob).toBeCalledTimes(entitiesDirJs.length);
			expect(internalRequire).toBeCalledTimes(entitiesDirJs.length * 2); // Because the mock implementation return 2x items
			expect(isPackageInstalled).toBeCalledTimes(0);
			expect(createDotThothDir).toBeCalledTimes(0);
			expect(emit).toBeCalledTimes(0);
			expect(result).toStrictEqual([]);
		});
	});

	describe("with only .ts files", () => {
		it("should throw error if typescript pkg is not installed", async () => {
			let result;

			isPackageInstalled.mockReturnValueOnce(false);

			try {
				result = await loadEntities(entitiesDirTs);
			} catch (err) {
				result = err;
			}

			expect(glob).toBeCalledTimes(entitiesDirTs.length);
			expect(internalRequire).toBeCalledTimes(0);
			expect(isPackageInstalled).toBeCalledTimes(1);
			expect(createDotThothDir).toBeCalledTimes(0);
			expect(emit).toBeCalledTimes(0);
			expect(result instanceof ThothError).toBeTruthy();
			expect(result).toStrictEqual(
				new ThothError({
					code: "MISSING_DEPENDENCY",
					origin: "THOTHOM",
					message: "Missing dependency",
					details: ["Missing package: typescript"],
				}),
			);
		});

		it("should return only classes", async () => {
			let result;

			isPackageInstalled.mockReturnValueOnce(true);
			internalRequire.mockReturnValueOnce({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ModuleKind: { CommonJS: "foo" },
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ModuleResolutionKind: { NodeJs: "foo" },
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ScriptTarget: { ES2017: "foo" },
				createProgram: () => ({
					emit,
				}),
			});
			internalRequire.mockReturnValueOnce({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				FooEntity,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				SubEntity,
				notClass: "foo",
			});
			internalRequire.mockReturnValueOnce({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				BarEntity,
				shouldFilterThis: "bar",
			});
			internalRequire.mockReturnValueOnce({});
			internalRequire.mockReturnValueOnce({});

			try {
				result = await loadEntities(entitiesDirTs);
			} catch (err) {
				result = err;
			}

			expect(glob).toBeCalledTimes(entitiesDirTs.length);
			// eslint-disable-next-line prettier/prettier
			expect(internalRequire).toBeCalledTimes((entitiesDirTs.length * 2) + 1); // Because the mock implementation return 2x items
			expect(isPackageInstalled).toBeCalledTimes(1);
			expect(createDotThothDir).toBeCalledTimes(1);
			expect(emit).toBeCalledTimes(1);
			expect(result).toStrictEqual([FooEntity, BarEntity]);
		});

		it("should throw error (without classes exported from files)", async () => {
			let result;

			isPackageInstalled.mockReturnValueOnce(true);
			internalRequire.mockReturnValueOnce({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ModuleKind: { CommonJS: "foo" },
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ModuleResolutionKind: { NodeJs: "foo" },
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ScriptTarget: { ES2017: "foo" },
				createProgram: () => ({
					emit,
				}),
			});
			internalRequire.mockReturnValueOnce({
				notClass: "foo",
			});
			internalRequire.mockReturnValueOnce({
				shouldFilterThis: "bar",
			});
			internalRequire.mockReturnValueOnce({});
			internalRequire.mockReturnValueOnce({});

			try {
				result = await loadEntities(entitiesDirTs);
			} catch (err) {
				result = err;
			}

			expect(glob).toBeCalledTimes(entitiesDirTs.length);
			// eslint-disable-next-line prettier/prettier
			expect(internalRequire).toBeCalledTimes((entitiesDirTs.length * 2) + 1); // Because the mock implementation return 2x items
			expect(isPackageInstalled).toBeCalledTimes(1);
			expect(createDotThothDir).toBeCalledTimes(1);
			expect(emit).toBeCalledTimes(1);
			expect(result).toStrictEqual([]);
		});
	});
});
