/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable jest/valid-title */

import { formatNamingStrategy } from "../../../lib/utils/format-naming-strategy";

describe("Utils > formatNamingStrategy", () => {
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
		const namingStrategy = "PascalCase";

		it(FROM_PASCAL, () => {
			const result = formatNamingStrategy({
				value: pascal,
				namingStrategy,
			});

			expect(result).toBe(pascal);
		});

		it(FROM_UPPER, () => {
			const result = formatNamingStrategy({
				value: upper,
				namingStrategy,
			});

			expect(result).toBe(pascal);
		});

		it(FROM_CAMEL, () => {
			const result = formatNamingStrategy({
				value: camel,
				namingStrategy,
			});

			expect(result).toBe(pascal);
		});

		it(FROM_KEBAB, () => {
			const result = formatNamingStrategy({
				value: kebab,
				namingStrategy,
			});

			expect(result).toBe(pascal);
		});

		it(FROM_SNAKE, () => {
			const result = formatNamingStrategy({
				value: snake,
				namingStrategy,
			});

			expect(result).toBe(pascal);
		});
	});

	describe("To UPPER_CASE", () => {
		const namingStrategy = "UPPER_CASE";

		it(FROM_PASCAL, () => {
			const result = formatNamingStrategy({
				value: pascal,
				namingStrategy,
			});

			expect(result).toBe(upper);
		});

		it(FROM_UPPER, () => {
			const result = formatNamingStrategy({
				value: upper,
				namingStrategy,
			});

			expect(result).toBe(upper);
		});

		it(FROM_CAMEL, () => {
			const result = formatNamingStrategy({
				value: camel,
				namingStrategy,
			});

			expect(result).toBe(upper);
		});

		it(FROM_KEBAB, () => {
			const result = formatNamingStrategy({
				value: kebab,
				namingStrategy,
			});

			expect(result).toBe(upper);
		});

		it(FROM_SNAKE, () => {
			const result = formatNamingStrategy({
				value: snake,
				namingStrategy,
			});

			expect(result).toBe(upper);
		});
	});

	describe("To camelCase", () => {
		const namingStrategy = "camelCase";

		it(FROM_PASCAL, () => {
			const result = formatNamingStrategy({
				value: pascal,
				namingStrategy,
			});

			expect(result).toBe(camel);
		});

		it(FROM_UPPER, () => {
			const result = formatNamingStrategy({
				value: upper,
				namingStrategy,
			});

			expect(result).toBe(camel);
		});

		it(FROM_CAMEL, () => {
			const result = formatNamingStrategy({
				value: camel,
				namingStrategy,
			});

			expect(result).toBe(camel);
		});

		it(FROM_KEBAB, () => {
			const result = formatNamingStrategy({
				value: kebab,
				namingStrategy,
			});

			expect(result).toBe(camel);
		});

		it(FROM_SNAKE, () => {
			const result = formatNamingStrategy({
				value: snake,
				namingStrategy,
			});

			expect(result).toBe(camel);
		});
	});

	describe("To kebab-case", () => {
		const namingStrategy = "kebab-case";

		it(FROM_PASCAL, () => {
			const result = formatNamingStrategy({
				value: pascal,
				namingStrategy,
			});

			expect(result).toBe(kebab);
		});

		it(FROM_UPPER, () => {
			const result = formatNamingStrategy({
				value: upper,
				namingStrategy,
			});

			expect(result).toBe(kebab);
		});

		it(FROM_CAMEL, () => {
			const result = formatNamingStrategy({
				value: camel,
				namingStrategy,
			});

			expect(result).toBe(kebab);
		});

		it(FROM_KEBAB, () => {
			const result = formatNamingStrategy({
				value: kebab,
				namingStrategy,
			});

			expect(result).toBe(kebab);
		});

		it(FROM_SNAKE, () => {
			const result = formatNamingStrategy({
				value: snake,
				namingStrategy,
			});

			expect(result).toBe(kebab);
		});
	});

	describe("To snake_case", () => {
		const namingStrategy = "snake_case";

		it(FROM_PASCAL, () => {
			const result = formatNamingStrategy({
				value: pascal,
				namingStrategy,
			});

			expect(result).toBe(snake);
		});

		it(FROM_UPPER, () => {
			const result = formatNamingStrategy({
				value: upper,
				namingStrategy,
			});

			expect(result).toBe(snake);
		});

		it(FROM_CAMEL, () => {
			const result = formatNamingStrategy({
				value: camel,
				namingStrategy,
			});

			expect(result).toBe(snake);
		});

		it(FROM_KEBAB, () => {
			const result = formatNamingStrategy({
				value: kebab,
				namingStrategy,
			});

			expect(result).toBe(snake);
		});

		it(FROM_SNAKE, () => {
			const result = formatNamingStrategy({
				value: snake,
				namingStrategy,
			});

			expect(result).toBe(snake);
		});
	});

	describe("To the same", () => {
		const namingStrategy = undefined;

		it(FROM_PASCAL, () => {
			const result = formatNamingStrategy({
				value: pascal,
				namingStrategy,
			});

			expect(result).toBe(pascal);
		});

		it(FROM_UPPER, () => {
			const result = formatNamingStrategy({
				value: upper,
				namingStrategy,
			});

			expect(result).toBe(upper);
		});

		it(FROM_CAMEL, () => {
			const result = formatNamingStrategy({
				value: camel,
				namingStrategy,
			});

			expect(result).toBe(camel);
		});

		it(FROM_KEBAB, () => {
			const result = formatNamingStrategy({
				value: kebab,
				namingStrategy,
			});

			expect(result).toBe(kebab);
		});

		it(FROM_SNAKE, () => {
			const result = formatNamingStrategy({
				value: snake,
				namingStrategy,
			});

			expect(result).toBe(snake);
		});
	});
});
