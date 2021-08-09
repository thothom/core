/* eslint-disable sonarjs/no-duplicate-string */

import { formatSuffix } from "../../../lib/utils/prefix-suffix/format-suffix";

describe("Utils > prefix-suffix > formatSuffix", () => {
	describe("Without config", () => {
		it("should return the same value if no config is passed", () => {
			const result = formatSuffix({
				value: "test",
			});

			expect(result).toBe("test");
		});

		it("should return the same value if empty config is passed", () => {
			const result = formatSuffix({
				value: "test",
				options: {},
			});

			expect(result).toBe("test");
		});
	});

	describe("With 'options.remove'", () => {
		it("should remove suffix", () => {
			const result = formatSuffix({
				value: "test-suffix",
				options: {
					remove: "-suffix",
				},
			});

			expect(result).toBe("test");
		});

		it("should remove suffix (without format case)", () => {
			const result = formatSuffix({
				value: "test-suffix",
				options: {
					remove: "suffix",
				},
			});

			expect(result).toBe("test-");
		});

		it("should NOT remove anything if the suffix doesn't exist", () => {
			const result = formatSuffix({
				value: "test",
				options: {
					remove: "-suffix",
				},
			});

			expect(result).toBe("test");
		});
	});

	describe("With 'options.add'", () => {
		it("should add suffix", () => {
			const result = formatSuffix({
				value: "test",
				options: {
					add: "-suffix",
				},
			});

			expect(result).toBe("test-suffix");
		});

		it("should add suffix (without format case)", () => {
			const result = formatSuffix({
				value: "test",
				options: {
					add: "suffix",
				},
			});

			expect(result).toBe("testsuffix");
		});
	});

	describe("With both 'options.remove' and 'options.add'", () => {
		it("should first remove then add suffix", () => {
			const result = formatSuffix({
				value: "test-initial",
				options: {
					remove: "-initial",
					add: "-final",
				},
			});

			expect(result).toBe("test-final");
		});
	});
});
