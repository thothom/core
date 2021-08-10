/* eslint-disable multiline-comment-style */
/* eslint-disable capitalized-comments */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Logger } from "../../lib/logger";

describe("Logger", () => {
	describe("Create new instance", () => {
		it("with ALL category", () => {
			const logger = new Logger("Default", "ALL");

			expect(logger.logLevels).toStrictEqual(["ERROR", "WARN", "LOG"]);
		});

		it("with ALL_INTERNAL category", () => {
			const logger = new Logger("Default", "ALL_INTERNAL");

			expect(logger.logLevels).toStrictEqual([
				"DEBUG",
				"ERROR",
				"INFO",
				"LOG",
				"WARN",
			]);
		});

		it("with MINIMUM category", () => {
			const logger = new Logger("Default", "MINIMUM");

			expect(logger.logLevels).toStrictEqual(["ERROR"]);
		});

		it("with NONE category", () => {
			const logger = new Logger("Default", "NONE");

			expect(logger.logLevels).toStrictEqual([]);
		});

		it("with custom array", () => {
			const logger = new Logger("Default", ["DEBUG", "INFO", "ERROR"]);

			expect(logger.logLevels).toStrictEqual(["DEBUG", "INFO", "ERROR"]);
		});
	});

	describe("DON'T log if log is not allowed", () => {
		const stderrSpy = jest.spyOn(process.stderr, "write");
		const stdoutSpy = jest.spyOn(process.stdout, "write");

		const checkCallParam = (spy: any, text: string) =>
			spy.mock.calls[0][0].includes(text);

		it("only allow DEBUG", () => {
			const logger = new Logger("Default", ["DEBUG"]);

			logger.debug("test");
			logger.error("test");
			logger.info("test");
			logger.log("test");
			logger.warn("test");

			expect(stderrSpy).toBeCalledTimes(0);
			expect(stdoutSpy).toBeCalledTimes(1);
			expect(checkCallParam(stdoutSpy, "DEBUG")).toBe(true);
		});

		it("only allow ERROR", () => {
			const logger = new Logger("Default", ["ERROR"]);

			logger.debug("test");
			logger.error("test");
			logger.info("test");
			logger.log("test");
			logger.warn("test");

			expect(stderrSpy).toBeCalledTimes(1);
			expect(stdoutSpy).toBeCalledTimes(0);
			expect(checkCallParam(stderrSpy, "ERROR")).toBe(true);
		});

		it("only allow INFO", () => {
			const logger = new Logger("Default", ["INFO"]);

			logger.debug("test");
			logger.error("test");
			logger.info("test");
			logger.log("test");
			logger.warn("test");

			expect(stderrSpy).toBeCalledTimes(0);
			expect(stdoutSpy).toBeCalledTimes(1);
			expect(checkCallParam(stdoutSpy, "INFO")).toBe(true);
		});

		it("only allow LOG", () => {
			const logger = new Logger("Default", ["LOG"]);

			logger.debug("test");
			logger.error("test");
			logger.info("test");
			logger.log("test");
			logger.warn("test");

			expect(stderrSpy).toBeCalledTimes(0);
			expect(stdoutSpy).toBeCalledTimes(1);
			expect(checkCallParam(stdoutSpy, "LOG")).toBe(true);
		});

		it("only allow WARN", () => {
			const logger = new Logger("Default", ["WARN"]);

			logger.debug("test");
			logger.error("test");
			logger.info("test");
			logger.log("test");
			logger.warn("test");

			expect(stderrSpy).toBeCalledTimes(0);
			expect(stdoutSpy).toBeCalledTimes(1);
			expect(checkCallParam(stdoutSpy, "WARN")).toBe(true);
		});
	});

	describe("Test log params type", () => {
		const logger = new Logger("Default", ["LOG"]);

		it("with object", () => {
			let result;

			try {
				logger.log({
					foo: "bar",
				});
			} catch (err) {
				result = err;
			}

			expect(result).toBeUndefined();
		});

		it("with date", () => {
			let result;

			try {
				logger.log({
					foo: new Date(),
				});
			} catch (err) {
				result = err;
			}

			expect(result).toBeUndefined();
		});
	});
});
