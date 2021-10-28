/* eslint-disable sonarjs/no-duplicate-string */
import { MetadataUtil } from "../../..";
import { SymbiosisError } from "../../../lib/error";
import { internalLoadEntities } from "../../../lib/utils/cli/load-entities/internal";

describe("Utils > CLI > loadEntities", () => {
	const getRootPath = jest.fn();
	const globUtil = jest.fn();
	const internalRequire = jest.fn();
	const isPackageInstalled = jest.fn();
	const createDotSymbiosisDir = jest.fn();
	const emit = jest.fn();

	class FooEntity {}
	class BarEntity {}
	class SubEntity {}

	const entitiesDirJs = ["foo/**/foo.js", "foo/**/bar.js"];
	const entitiesDirTs = ["foo/**/foo.ts", "foo/**/bar.ts"];

	const loadEntities = (entitiesDir: Array<string>) =>
		internalLoadEntities({
			entitiesDir,
			getRootPath,
			globUtil,
			internalRequire,
			isPackageInstalled,
			createDotSymbiosisDir,
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

		globUtil.mockImplementation(
			(path: string) =>
				new Promise(resolve =>
					resolve([path.replace(/\*\*/, "bar"), path.replace(/\*\*/, "foo")]),
				),
		);
	});

	describe("with empty array of entitiesPaths", () => {
		it("should throw error", async () => {
			let result;

			try {
				result = await loadEntities([]);
			} catch (err) {
				result = err;
			}

			expect(globUtil).toBeCalledTimes(0);
			expect(internalRequire).toBeCalledTimes(0);
			expect(isPackageInstalled).toBeCalledTimes(0);
			expect(createDotSymbiosisDir).toBeCalledTimes(0);
			expect(emit).toBeCalledTimes(0);
			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: "Missing config",
					details: ["No entities found at: "],
				}),
			);
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

			expect(globUtil).toBeCalledTimes(entitiesDirJs.length);
			expect(internalRequire).toBeCalledTimes(entitiesDirJs.length * 2); // Because the mock implementation return 2x items
			expect(isPackageInstalled).toBeCalledTimes(0);
			expect(createDotSymbiosisDir).toBeCalledTimes(0);
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

			expect(globUtil).toBeCalledTimes(entitiesDirJs.length);
			expect(internalRequire).toBeCalledTimes(entitiesDirJs.length * 2); // Because the mock implementation return 2x items
			expect(isPackageInstalled).toBeCalledTimes(0);
			expect(createDotSymbiosisDir).toBeCalledTimes(0);
			expect(emit).toBeCalledTimes(0);
			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: "Missing config",
					details: [`No entities found at: ${entitiesDirJs.join(", ")}`],
				}),
			);
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

			expect(globUtil).toBeCalledTimes(entitiesDirTs.length);
			expect(internalRequire).toBeCalledTimes(0);
			expect(isPackageInstalled).toBeCalledTimes(1);
			expect(createDotSymbiosisDir).toBeCalledTimes(0);
			expect(emit).toBeCalledTimes(0);
			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "MISSING_DEPENDENCY",
					origin: "SYMBIOSIS",
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

			expect(globUtil).toBeCalledTimes(entitiesDirTs.length);
			// eslint-disable-next-line prettier/prettier
			expect(internalRequire).toBeCalledTimes((entitiesDirTs.length * 2) + 1); // Because the mock implementation return 2x items
			expect(isPackageInstalled).toBeCalledTimes(1);
			expect(createDotSymbiosisDir).toBeCalledTimes(1);
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

			expect(globUtil).toBeCalledTimes(entitiesDirTs.length);
			// eslint-disable-next-line prettier/prettier
			expect(internalRequire).toBeCalledTimes((entitiesDirTs.length * 2) + 1); // Because the mock implementation return 2x items
			expect(isPackageInstalled).toBeCalledTimes(1);
			expect(createDotSymbiosisDir).toBeCalledTimes(1);
			expect(emit).toBeCalledTimes(1);
			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: "Missing config",
					details: [`No entities found at: ${entitiesDirTs.join(", ")}`],
				}),
			);
		});
	});
});
