/* eslint-disable sonarjs/no-duplicate-string */
import {
	internalCreateDotSymbiosisDir,
	gitIgnoreMessage,
} from "../../../lib/utils/cli/create-dot-symb-dir/internal";

describe("Utils > CLI > createDotSymbDir", () => {
	const getRootPath = jest.fn();
	const mkdirSync = jest.fn();
	const existsSync = jest.fn();
	const readFileSync = jest.fn();
	const writeFileSync = jest.fn();

	const createDotSymbDir = (path: string) =>
		internalCreateDotSymbiosisDir({
			getRootPath,
			mkdirSync,
			existsSync,
			readFileSync,
			writeFileSync,
			path,
		});

	beforeEach(() => {
		getRootPath.mockImplementation(
			path => `root/path/${path.replace(/^\//, "")}`,
		);
	});

	describe(".symbiosis folder exists", () => {
		it("should create dir (path without /)", () => {
			existsSync.mockReturnValueOnce(true);

			createDotSymbDir("foo/bar");

			expect(getRootPath).toBeCalledTimes(1);
			expect(existsSync).toBeCalledTimes(1);
			expect(mkdirSync).toBeCalledTimes(1);
			expect(readFileSync).toBeCalledTimes(0);
			expect(writeFileSync).toBeCalledTimes(0);
			expect(mkdirSync).toBeCalledWith("root/path/.symbiosis/foo/bar", {
				recursive: true,
			});
		});

		it("should create dir (path with /)", () => {
			existsSync.mockReturnValueOnce(true);

			createDotSymbDir("/foo/bar");

			expect(getRootPath).toBeCalledTimes(1);
			expect(existsSync).toBeCalledTimes(1);
			expect(mkdirSync).toBeCalledTimes(1);
			expect(readFileSync).toBeCalledTimes(0);
			expect(writeFileSync).toBeCalledTimes(0);
			expect(mkdirSync).toBeCalledWith("root/path/.symbiosis/foo/bar", {
				recursive: true,
			});
		});
	});

	describe("folder not exists && .gitignore exits && .gitignore ignores", () => {
		it("should create dir", () => {
			existsSync.mockReturnValueOnce(false);
			existsSync.mockReturnValueOnce(true);
			readFileSync.mockReturnValueOnce("\n/.symbiosis\n");

			createDotSymbDir("foo/bar");

			expect(getRootPath).toBeCalledTimes(2);
			expect(existsSync).toBeCalledTimes(2);
			expect(mkdirSync).toBeCalledTimes(1);
			expect(readFileSync).toBeCalledTimes(1);
			expect(writeFileSync).toBeCalledTimes(0);
			expect(mkdirSync).toBeCalledWith("root/path/.symbiosis/foo/bar", {
				recursive: true,
			});
		});
	});

	describe("folder not exists && .gitignore exits && .gitignore dont ignores", () => {
		it("should create dir && add to .gitignore", () => {
			const gitIgnoreContent = "foo";

			existsSync.mockReturnValueOnce(false);
			existsSync.mockReturnValueOnce(true);
			readFileSync.mockReturnValueOnce(gitIgnoreContent);

			createDotSymbDir("foo/bar");

			expect(getRootPath).toBeCalledTimes(2);
			expect(existsSync).toBeCalledTimes(2);
			expect(mkdirSync).toBeCalledTimes(1);
			expect(readFileSync).toBeCalledTimes(1);
			expect(writeFileSync).toBeCalledTimes(1);
			expect(writeFileSync).toBeCalledWith(
				"root/path/.gitignore",
				`${gitIgnoreContent}${"\n\n"}${gitIgnoreMessage}`,
			);
			expect(mkdirSync).toBeCalledWith("root/path/.symbiosis/foo/bar", {
				recursive: true,
			});
		});

		it("should create dir && add to .gitignore && insert final new line", () => {
			const gitIgnoreContent = "foo\n\n";

			existsSync.mockReturnValueOnce(false);
			existsSync.mockReturnValueOnce(true);
			readFileSync.mockReturnValueOnce(gitIgnoreContent);

			createDotSymbDir("foo/bar");

			expect(getRootPath).toBeCalledTimes(2);
			expect(existsSync).toBeCalledTimes(2);
			expect(mkdirSync).toBeCalledTimes(1);
			expect(readFileSync).toBeCalledTimes(1);
			expect(writeFileSync).toBeCalledTimes(1);
			expect(writeFileSync).toBeCalledWith(
				"root/path/.gitignore",
				`${gitIgnoreContent}${gitIgnoreMessage}`,
			);
			expect(mkdirSync).toBeCalledWith("root/path/.symbiosis/foo/bar", {
				recursive: true,
			});
		});
	});

	describe("folder not exists && .gitignore dont exits", () => {
		it("should create dir && create .gitignore && add to .gitignore", () => {
			existsSync.mockReturnValueOnce(false);
			existsSync.mockReturnValueOnce(false);

			createDotSymbDir("foo/bar");

			expect(getRootPath).toBeCalledTimes(2);
			expect(existsSync).toBeCalledTimes(2);
			expect(mkdirSync).toBeCalledTimes(1);
			expect(readFileSync).toBeCalledTimes(0);
			expect(writeFileSync).toBeCalledTimes(1);
			expect(writeFileSync).toBeCalledWith(
				"root/path/.gitignore",
				`${gitIgnoreMessage}${"\n"}`,
			);
			expect(mkdirSync).toBeCalledWith("root/path/.symbiosis/foo/bar", {
				recursive: true,
			});
		});
	});
});
