import { CompassError } from "../../../../lib/error";
import { CompassErrorCodeEnum } from "../../../../lib/error/types/error-code.enum";
import { Between } from "../../../../lib/repository/queries/find-operators/between";
import { Exist } from "../../../../lib/repository/queries/find-operators/exist";
import { In } from "../../../../lib/repository/queries/find-operators/in";
import { IsNull } from "../../../../lib/repository/queries/find-operators/is-null";
import { LessThan } from "../../../../lib/repository/queries/find-operators/less-than";
import { LessThanOrEqual } from "../../../../lib/repository/queries/find-operators/less-than-or-equal";
import { Like } from "../../../../lib/repository/queries/find-operators/like";
import { MoreThan } from "../../../../lib/repository/queries/find-operators/more-than";
import { MoreThanOrEqual } from "../../../../lib/repository/queries/find-operators/more-than-or-equal";
import { Not } from "../../../../lib/repository/queries/find-operators/not";

describe("Repository > Queries > Find > Operators > Not", () => {
	describe("Valid Simple Values", () => {
		it("should create a Not operator with a string", () => {
			const operator = Not("foo");

			expect(operator.type).toBe("not");
			expect(operator.values).toStrictEqual(["foo"]);
			expect(operator.not).toBeUndefined();
		});

		it("should create a Not operator with a number", () => {
			const operator = Not(1);

			expect(operator.type).toBe("not");
			expect(operator.values).toStrictEqual([1]);
			expect(operator.not).toBeUndefined();
		});

		it("should create a Not operator with a date", () => {
			const date = new Date();

			const operator = Not(date);

			expect(operator.type).toBe("not");
			expect(operator.values).toStrictEqual([date]);
			expect(operator.not).toBeUndefined();
		});
	});

	describe("Valid Operators", () => {
		it("should create a Between operator", () => {
			const operator = Not(Between(1, 10));

			expect(operator.type).toBe("between");
			expect(operator.values).toStrictEqual([1, 10]);
			expect(operator.not).toBe(true);
		});

		it("should create a Exist operator", () => {
			const operator = Not(Exist());

			expect(operator.type).toBe("exist");
			expect(operator.values).toStrictEqual([]);
			expect(operator.not).toBe(true);
		});

		it("should create a In operator", () => {
			const operator = Not(In([1, 10]));

			expect(operator.type).toBe("in");
			expect(operator.values).toStrictEqual([1, 10]);
			expect(operator.not).toBe(true);
		});

		it("should create a IsNull operator", () => {
			const operator = Not(IsNull());

			expect(operator.type).toBe("isNull");
			expect(operator.values).toStrictEqual([]);
			expect(operator.not).toBe(true);
		});

		it("should create a Like operator", () => {
			const operator = Not(Like("foo"));

			expect(operator.type).toBe("like");
			expect(operator.values).toStrictEqual(["foo"]);
			expect(operator.not).toBe(true);
		});
	});

	describe("Invalid Operators", () => {
		const ERROR_MESSAGE = "Incorrect use of NOT operator";

		it("should throw an error if a LessThanOrEqual operator is used as param", () => {
			let result;

			try {
				Not(LessThanOrEqual(1));
			} catch (err) {
				result = err;
			}

			expect(result instanceof CompassError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe(CompassErrorCodeEnum.INVALID_PARAM);
			expect(result.origin).toBe("COMPASS");
			expect(result.details).toStrictEqual([
				"Not operator should not be used with LessThanOrEqual operator, use MoreThan operator instead",
			]);
		});

		it("should throw an error if a LessThan operator is used as param", () => {
			let result;

			try {
				Not(LessThan(1));
			} catch (err) {
				result = err;
			}

			expect(result instanceof CompassError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe(CompassErrorCodeEnum.INVALID_PARAM);
			expect(result.origin).toBe("COMPASS");
			expect(result.details).toStrictEqual([
				"Not operator should not be used with LessThan operator, use MoreThanOrEqual operator instead",
			]);
		});

		it("should throw an error if a MoreThanOrEqual operator is used as param", () => {
			let result;

			try {
				Not(MoreThanOrEqual(1));
			} catch (err) {
				result = err;
			}

			expect(result instanceof CompassError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe(CompassErrorCodeEnum.INVALID_PARAM);
			expect(result.origin).toBe("COMPASS");
			expect(result.details).toStrictEqual([
				"Not operator should not be used with LessThanOrEqual operator, use LessThan operator instead",
			]);
		});

		it("should throw an error if a MoreThan operator is used as param", () => {
			let result;

			try {
				Not(MoreThan(1));
			} catch (err) {
				result = err;
			}

			expect(result instanceof CompassError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe(CompassErrorCodeEnum.INVALID_PARAM);
			expect(result.origin).toBe("COMPASS");
			expect(result.details).toStrictEqual([
				"Not operator should not be used with MoreThan operator, use LessThanOrEqual operator instead",
			]);
		});

		it("should throw an error if a Not operator is used as param", () => {
			let result;

			try {
				Not(Not(1));
			} catch (err) {
				result = err;
			}

			expect(result instanceof CompassError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe(CompassErrorCodeEnum.INVALID_PARAM);
			expect(result.origin).toBe("COMPASS");
			expect(result.details).toStrictEqual([
				"Not operator should not be used with Not operator",
			]);
		});
	});
});
