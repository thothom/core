import { Append } from "../../../lib/repository/operators/save/append";
import { IfNotExists } from "../../../lib/repository/operators/save/if-not-exists";
import { Max } from "../../../lib/repository/operators/save/max";
import { Min } from "../../../lib/repository/operators/save/min";
import { Minus } from "../../../lib/repository/operators/save/minus";
import { Plus } from "../../../lib/repository/operators/save/plus";
import { Pop } from "../../../lib/repository/operators/save/pop";
import { Remove } from "../../../lib/repository/operators/save/remove";
import { isSaveOperator } from "../../../lib/utils/operators/is-save-operator";

describe("Utils > Validations > isSaveOperator", () => {
	describe("With save operators", () => {
		it("should return true with Append", () => {
			const result = isSaveOperator(Append(10, 20));

			expect(result).toBe(true);
		});

		it("should return true with IfNotExists", () => {
			const result = isSaveOperator(IfNotExists("foo"));

			expect(result).toBe(true);
		});

		it("should return true with Max", () => {
			const result = isSaveOperator(Max(5));

			expect(result).toBe(true);
		});

		it("should return true with Min", () => {
			const result = isSaveOperator(Min(5));

			expect(result).toBe(true);
		});

		it("should return true with Minus", () => {
			const result = isSaveOperator(Minus(5));

			expect(result).toBe(true);
		});

		it("should return true with Plus", () => {
			const result = isSaveOperator(Plus(5));

			expect(result).toBe(true);
		});

		it("should return true with Pop", () => {
			const result = isSaveOperator(Pop(5));

			expect(result).toBe(true);
		});

		it("should return true with Remove", () => {
			const result = isSaveOperator(Remove());

			expect(result).toBe(true);
		});
	});

	describe("With not find operators values", () => {
		it("should return true with no params", () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			const result = isSaveOperator();

			expect(result).toBe(false);
		});

		it("should return true with undefined", () => {
			const result = isSaveOperator(undefined);

			expect(result).toBe(false);
		});

		it("should return true with null", () => {
			const result = isSaveOperator(null);

			expect(result).toBe(false);
		});

		it("should return false with string", () => {
			const result = isSaveOperator("foo");

			expect(result).toBe(false);
		});

		it("should return false with boolean (false)", () => {
			const result = isSaveOperator(false);

			expect(result).toBe(false);
		});

		it("should return false with boolean (true)", () => {
			const result = isSaveOperator(true);

			expect(result).toBe(false);
		});

		it("should return false with number", () => {
			const result = isSaveOperator(123);

			expect(result).toBe(false);
		});

		it("should return false with empty object", () => {
			const result = isSaveOperator({});

			expect(result).toBe(false);
		});

		it("should return false with object", () => {
			const result = isSaveOperator({
				foo: "bar",
			});

			expect(result).toBe(false);
		});
	});
});
