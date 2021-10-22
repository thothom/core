import { Append } from "../../../lib/repository/operators/save/append";
import { IfNotExists } from "../../../lib/repository/operators/save/if-not-exists";
import { Max } from "../../../lib/repository/operators/save/max";
import { Min } from "../../../lib/repository/operators/save/min";
import { Minus } from "../../../lib/repository/operators/save/minus";
import { Plus } from "../../../lib/repository/operators/save/plus";
import { Pop } from "../../../lib/repository/operators/save/pop";
import { Remove } from "../../../lib/repository/operators/save/remove";
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
import { isOperator } from "../../../lib/utils/operators/is-operator";

describe("Utils > Validations > isOperator", () => {
	describe("With save operators", () => {
		it("should return true with Append", () => {
			const result = isOperator(Append(10, 20));

			expect(result).toBe(true);
		});

		it("should return true with IfNotExists", () => {
			const result = isOperator(IfNotExists("foo"));

			expect(result).toBe(true);
		});

		it("should return true with Max", () => {
			const result = isOperator(Max(5));

			expect(result).toBe(true);
		});

		it("should return true with Min", () => {
			const result = isOperator(Min(5));

			expect(result).toBe(true);
		});

		it("should return true with Minus", () => {
			const result = isOperator(Minus(5));

			expect(result).toBe(true);
		});

		it("should return true with Plus", () => {
			const result = isOperator(Plus(5));

			expect(result).toBe(true);
		});

		it("should return true with Pop", () => {
			const result = isOperator(Pop(5));

			expect(result).toBe(true);
		});

		it("should return true with Remove", () => {
			const result = isOperator(Remove());

			expect(result).toBe(true);
		});
	});

	describe("With find operators", () => {
		it("should return true with Between", () => {
			const result = isOperator(Between(10, 20));

			expect(result).toBe(true);
		});

		it("should return true with EndsWith", () => {
			const result = isOperator(EndsWith("foo"));

			expect(result).toBe(true);
		});

		it("should return true with Exist", () => {
			const result = isOperator(Exist());

			expect(result).toBe(true);
		});

		it("should return true with In", () => {
			const result = isOperator(In(["foo", "bar"]));

			expect(result).toBe(true);
		});

		it("should return true with IsNull", () => {
			const result = isOperator(IsNull());

			expect(result).toBe(true);
		});

		it("should return true with LessThan", () => {
			const result = isOperator(LessThan(10));

			expect(result).toBe(true);
		});

		it("should return true with LessThanOrEqual", () => {
			const result = isOperator(LessThanOrEqual(10));

			expect(result).toBe(true);
		});

		it("should return true with Like", () => {
			const result = isOperator(Like("foo"));

			expect(result).toBe(true);
		});

		it("should return true with MoreThan", () => {
			const result = isOperator(MoreThan(10));

			expect(result).toBe(true);
		});

		it("should return true with MoreThanOrEqual", () => {
			const result = isOperator(MoreThanOrEqual(10));

			expect(result).toBe(true);
		});

		it("should return true with Not", () => {
			const result = isOperator(Not(10));

			expect(result).toBe(true);
		});

		it("should return true with StartsWith", () => {
			const result = isOperator(StartsWith("foo"));

			expect(result).toBe(true);
		});
	});

	describe("With not find operators values", () => {
		it("should return true with no params", () => {
			const result = isOperator();

			expect(result).toBe(false);
		});

		it("should return true with undefined", () => {
			const result = isOperator(undefined);

			expect(result).toBe(false);
		});

		it("should return true with null", () => {
			const result = isOperator(null);

			expect(result).toBe(false);
		});

		it("should return false with string", () => {
			const result = isOperator("foo");

			expect(result).toBe(false);
		});

		it("should return false with boolean (false)", () => {
			const result = isOperator(false);

			expect(result).toBe(false);
		});

		it("should return false with boolean (true)", () => {
			const result = isOperator(true);

			expect(result).toBe(false);
		});

		it("should return false with number", () => {
			const result = isOperator(123);

			expect(result).toBe(false);
		});

		it("should return false with empty object", () => {
			const result = isOperator({});

			expect(result).toBe(false);
		});

		it("should return false with object", () => {
			const result = isOperator({
				foo: "bar",
			});

			expect(result).toBe(false);
		});
	});
});
