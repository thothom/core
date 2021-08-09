/* eslint-disable sonarjs/no-duplicate-string */

import { formatPrefix } from "../../../lib/utils/prefix-suffix/format-prefix";

describe("Utils > prefix-suffix > formatPrefix", () => {
	describe("Without config", () => {
		it("should return the same value if no config is passed", () => {
			const result = formatPrefix({
				value: "test",
			});

			expect(result).toBe("test");
		});

		it("should return the same value if empty config is passed", () => {
			const result = formatPrefix({
				value: "test",
				options: {},
			});

			expect(result).toBe("test");
		});
	});

	describe("With 'options.remove'", () => {
		it("should remove prefix", () => {
			const result = formatPrefix({
				value: "prefix-test",
				options: {
					remove: "prefix-",
				},
			});

			expect(result).toBe("test");
		});

		it("should remove prefix (without format case)", () => {
			const result = formatPrefix({
				value: "prefix-test",
				options: {
					remove: "prefix",
				},
			});

			expect(result).toBe("-test");
		});

		it("should NOT remove anything if the prefix doesn't exist", () => {
			const result = formatPrefix({
				value: "test",
				options: {
					remove: "prefix-",
				},
			});

			expect(result).toBe("test");
		});
	});

	describe("With 'options.add'", () => {
		it("should add prefix", () => {
			const result = formatPrefix({
				value: "test",
				options: {
					add: "prefix-",
				},
			});

			expect(result).toBe("prefix-test");
		});

		it("should add prefix (without format case)", () => {
			const result = formatPrefix({
				value: "test",
				options: {
					add: "prefix",
				},
			});

			expect(result).toBe("prefixtest");
		});
	});

	describe("With both 'options.remove' and 'options.add'", () => {
		it("should first remove then add prefix", () => {
			const result = formatPrefix({
				value: "initial-test",
				options: {
					remove: "initial-",
					add: "final-",
				},
			});

			expect(result).toBe("final-test");
		});
	});
});
