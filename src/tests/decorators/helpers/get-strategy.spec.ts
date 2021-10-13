import { getStrategy } from "../../../lib/decorators/primary-generated-column/helpers/get-strategy";
import { SymbiosisError } from "../../../lib/error";
import { SymbiosisErrorCodeEnum } from "../../../lib/error/types/error-code.enum";

describe("getStrategy Util", () => {
	it("should throw an error if uuid is not installed", () => {
		let result: any;

		try {
			const checkIfLibExists = jest.fn();

			// .mockRejectedValue doesn't work here
			checkIfLibExists.mockImplementation(() => {
				throw new Error();
			});

			result = getStrategy({
				strategyOrOptions: "uuid",
				checkIfLibExists,
				// Unnecessary params
				entityPrototype: {} as any,
				propertyName: "",
			});
		} catch (err) {
			result = err;
		}

		expect(result instanceof SymbiosisError).toBe(true);
		expect(result.message).toBe("Invalid param");
		expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM);
		expect(result.origin).toBe("SYMBIOSIS");
		expect(result.details).toStrictEqual([
			'To use the "uuid" option, you need to install the "uuid" lib.',
			"Example: `yarn add uuid` OR `npm i --save uuid`",
		]);
	});
});
