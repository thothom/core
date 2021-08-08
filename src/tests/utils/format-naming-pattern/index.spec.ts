/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable jest/valid-title */

import { formatNamingPattern } from "../../../lib/utils/format-naming-pattern";

describe("Utils > formatNamingPattern", () => {
	const FROM_PASCAL = "from PascalCase";
	const FROM_UPPER = "from UPPER_CASE";
	const FROM_CAMEL = "from camelCase";
	const FROM_KEBAB = "from kebab-case";
	const FROM_SNAKE = "from snake_Case";

	const pascal = "TestTest";
	const upper = "TEST_TEST";
	const camel = "testTest";
	const kebab = "test-test";
	const snake = "test_test";

	describe("To PascalCase", () => {
		const namingPattern = "PascalCase";

		it(FROM_PASCAL, () => {
			const result = formatNamingPattern({
				value: pascal,
				namingPattern,
			});

			expect(result).toBe(pascal);
		});

		it(FROM_UPPER, () => {
			const result = formatNamingPattern({
				value: upper,
				namingPattern,
			});

			expect(result).toBe(pascal);
		});

		it(FROM_CAMEL, () => {
			const result = formatNamingPattern({
				value: camel,
				namingPattern,
			});

			expect(result).toBe(pascal);
		});

		it(FROM_KEBAB, () => {
			const result = formatNamingPattern({
				value: kebab,
				namingPattern,
			});

			expect(result).toBe(pascal);
		});

		it(FROM_SNAKE, () => {
			const result = formatNamingPattern({
				value: snake,
				namingPattern,
			});

			expect(result).toBe(pascal);
		});
	});

	describe("To UPPER_CASE", () => {
		const namingPattern = "UPPER_CASE";

		it(FROM_PASCAL, () => {
			const result = formatNamingPattern({
				value: pascal,
				namingPattern,
			});

			expect(result).toBe(upper);
		});

		it(FROM_UPPER, () => {
			const result = formatNamingPattern({
				value: upper,
				namingPattern,
			});

			expect(result).toBe(upper);
		});

		it(FROM_CAMEL, () => {
			const result = formatNamingPattern({
				value: camel,
				namingPattern,
			});

			expect(result).toBe(upper);
		});

		it(FROM_KEBAB, () => {
			const result = formatNamingPattern({
				value: kebab,
				namingPattern,
			});

			expect(result).toBe(upper);
		});

		it(FROM_SNAKE, () => {
			const result = formatNamingPattern({
				value: snake,
				namingPattern,
			});

			expect(result).toBe(upper);
		});
	});

	describe("To camelCase", () => {
		const namingPattern = "camelCase";

		it(FROM_PASCAL, () => {
			const result = formatNamingPattern({
				value: pascal,
				namingPattern,
			});

			expect(result).toBe(camel);
		});

		it(FROM_UPPER, () => {
			const result = formatNamingPattern({
				value: upper,
				namingPattern,
			});

			expect(result).toBe(camel);
		});

		it(FROM_CAMEL, () => {
			const result = formatNamingPattern({
				value: camel,
				namingPattern,
			});

			expect(result).toBe(camel);
		});

		it(FROM_KEBAB, () => {
			const result = formatNamingPattern({
				value: kebab,
				namingPattern,
			});

			expect(result).toBe(camel);
		});

		it(FROM_SNAKE, () => {
			const result = formatNamingPattern({
				value: snake,
				namingPattern,
			});

			expect(result).toBe(camel);
		});
	});

	describe("To kebab-case", () => {
		const namingPattern = "kebab-case";

		it(FROM_PASCAL, () => {
			const result = formatNamingPattern({
				value: pascal,
				namingPattern,
			});

			expect(result).toBe(kebab);
		});

		it(FROM_UPPER, () => {
			const result = formatNamingPattern({
				value: upper,
				namingPattern,
			});

			expect(result).toBe(kebab);
		});

		it(FROM_CAMEL, () => {
			const result = formatNamingPattern({
				value: camel,
				namingPattern,
			});

			expect(result).toBe(kebab);
		});

		it(FROM_KEBAB, () => {
			const result = formatNamingPattern({
				value: kebab,
				namingPattern,
			});

			expect(result).toBe(kebab);
		});

		it(FROM_SNAKE, () => {
			const result = formatNamingPattern({
				value: snake,
				namingPattern,
			});

			expect(result).toBe(kebab);
		});
	});

	describe("To snake_case", () => {
		const namingPattern = "snake_case";

		it(FROM_PASCAL, () => {
			const result = formatNamingPattern({
				value: pascal,
				namingPattern,
			});

			expect(result).toBe(snake);
		});

		it(FROM_UPPER, () => {
			const result = formatNamingPattern({
				value: upper,
				namingPattern,
			});

			expect(result).toBe(snake);
		});

		it(FROM_CAMEL, () => {
			const result = formatNamingPattern({
				value: camel,
				namingPattern,
			});

			expect(result).toBe(snake);
		});

		it(FROM_KEBAB, () => {
			const result = formatNamingPattern({
				value: kebab,
				namingPattern,
			});

			expect(result).toBe(snake);
		});

		it(FROM_SNAKE, () => {
			const result = formatNamingPattern({
				value: snake,
				namingPattern,
			});

			expect(result).toBe(snake);
		});
	});

	describe("To the same", () => {
		const namingPattern = undefined;

		it(FROM_PASCAL, () => {
			const result = formatNamingPattern({
				value: pascal,
				namingPattern,
			});

			expect(result).toBe(pascal);
		});

		it(FROM_UPPER, () => {
			const result = formatNamingPattern({
				value: upper,
				namingPattern,
			});

			expect(result).toBe(upper);
		});

		it(FROM_CAMEL, () => {
			const result = formatNamingPattern({
				value: camel,
				namingPattern,
			});

			expect(result).toBe(camel);
		});

		it(FROM_KEBAB, () => {
			const result = formatNamingPattern({
				value: kebab,
				namingPattern,
			});

			expect(result).toBe(kebab);
		});

		it(FROM_SNAKE, () => {
			const result = formatNamingPattern({
				value: snake,
				namingPattern,
			});

			expect(result).toBe(snake);
		});
	});
});
