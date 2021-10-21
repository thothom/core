import { Between } from "../../../lib/repository/operators/find/between";
import { EndsWith } from "../../../lib/repository/operators/find/ends-with";
import { Exist } from "../../../lib/repository/operators/find/exist";
import { In } from "../../../lib/repository/operators/find/in";
import { IsNull } from "../../../lib/repository/operators/find/is-null";
import { LessThan } from "../../../lib/repository/operators/find/less-than";
import { LessThanOrEqual } from "../../../lib/repository/operators/find/less-than-or-equal";
import { Like } from "../../../lib/repository/operators/find/like";
import { MoreThan } from "../../../lib/repository/operators/find/more-than";
import { MoreThanOrEqual } from "../../../lib/repository/operators/find/more-than-or-equal";
import { Not } from "../../../lib/repository/operators/find/not";
import { StartsWith } from "../../../lib/repository/operators/find/starts-with";
import { isFindOperator } from "../../../lib/utils/validations/is-find-operator";

describe("Utils > Validations > isFindOperator", () => {
	describe("With find operators", () => {
		it("should return true with Between", () => {
			const result = isFindOperator(Between(10, 20));

			expect(result).toBe(true);
		});

		it("should return true with EndsWith", () => {
			const result = isFindOperator(EndsWith("foo"));

			expect(result).toBe(true);
		});

		it("should return true with Exist", () => {
			const result = isFindOperator(Exist());

			expect(result).toBe(true);
		});

		it("should return true with In", () => {
			const result = isFindOperator(In(["foo", "bar"]));

			expect(result).toBe(true);
		});

		it("should return true with IsNull", () => {
			const result = isFindOperator(IsNull());

			expect(result).toBe(true);
		});

		it("should return true with LessThan", () => {
			const result = isFindOperator(LessThan(10));

			expect(result).toBe(true);
		});

		it("should return true with LessThanOrEqual", () => {
			const result = isFindOperator(LessThanOrEqual(10));

			expect(result).toBe(true);
		});

		it("should return true with Like", () => {
			const result = isFindOperator(Like("foo"));

			expect(result).toBe(true);
		});

		it("should return true with MoreThan", () => {
			const result = isFindOperator(MoreThan(10));

			expect(result).toBe(true);
		});

		it("should return true with MoreThanOrEqual", () => {
			const result = isFindOperator(MoreThanOrEqual(10));

			expect(result).toBe(true);
		});

		it("should return true with Not", () => {
			const result = isFindOperator(Not(10));

			expect(result).toBe(true);
		});

		it("should return true with StartsWith", () => {
			const result = isFindOperator(StartsWith("foo"));

			expect(result).toBe(true);
		});
	});

	describe("With not find operators values", () => {
		it("should return true with no params", () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			const result = isFindOperator();

			expect(result).toBe(false);
		});

		it("should return true with undefined", () => {
			const result = isFindOperator(undefined);

			expect(result).toBe(false);
		});

		it("should return true with null", () => {
			const result = isFindOperator(null);

			expect(result).toBe(false);
		});

		it("should return false with string", () => {
			const result = isFindOperator("foo");

			expect(result).toBe(false);
		});

		it("should return false with boolean (false)", () => {
			const result = isFindOperator(false);

			expect(result).toBe(false);
		});

		it("should return false with boolean (true)", () => {
			const result = isFindOperator(true);

			expect(result).toBe(false);
		});

		it("should return false with number", () => {
			const result = isFindOperator(123);

			expect(result).toBe(false);
		});

		it("should return false with empty object", () => {
			const result = isFindOperator({});

			expect(result).toBe(false);
		});

		it("should return false with object", () => {
			const result = isFindOperator({
				foo: "bar",
			});

			expect(result).toBe(false);
		});
	});
});
