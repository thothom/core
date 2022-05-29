import { generateUuid } from "../../../../../lib/entity-manager/methods/helpers/auto-generate/generate-uuid";
import { ThothError } from "../../../../../lib/error";

describe("generateUuid", () => {
	it("should throw an error if uuid is not installed", () => {
		let result: any;

		try {
			const checkIfLibExists = jest.fn();

			// .mockRejectedValue doesn't work here
			checkIfLibExists.mockImplementation(() => {
				throw new Error();
			});

			result = generateUuid(checkIfLibExists);
		} catch (err) {
			result = err;
		}

		expect(result instanceof ThothError).toBe(true);
		expect(result.message).toBe("Invalid param");
		expect(result.code).toBe("INVALID_PARAM");
		expect(result.origin).toBe("THOTHOM");
		expect(result.details).toStrictEqual([
			'To use the "uuid" option, you need to install the "uuid" lib.',
			"Example: `yarn add uuid` OR `npm i --save uuid`",
		]);
	});
});
