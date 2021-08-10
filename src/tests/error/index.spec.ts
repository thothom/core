import { CompassError } from "../../lib/error";
import { CompassErrorCodeEnum } from "../../lib/error/types/error-code.enum";

describe("CompassError", () => {
	it("should throw error correctly (simple details)", () => {
		let result;

		try {
			throw new CompassError({
				message: "Message",
				code: CompassErrorCodeEnum.UNKNOWN,
				origin: "COMPASS",
				details: ["Details"],
			});
		} catch (err) {
			result = err;
		}

		expect(result instanceof Error).toBe(true);
		expect(result instanceof CompassError).toBe(true);
		expect(result).toHaveProperty("stack");
		expect(result.code).toBe(CompassErrorCodeEnum.UNKNOWN);
		expect(result.message).toBe("Message");
		expect(result.origin).toBe("COMPASS");
		expect(result.details).toStrictEqual(["Details"]);
	});

	it("should throw error correctly (complex details)", () => {
		let result;

		try {
			throw new CompassError({
				message: "Message",
				code: CompassErrorCodeEnum.UNKNOWN,
				origin: "COMPASS",
				details: [
					{
						foo: "bar",
					},
				],
			});
		} catch (err) {
			result = err;
		}

		expect(result instanceof Error).toBe(true);
		expect(result instanceof CompassError).toBe(true);
		expect(result).toHaveProperty("stack");
		expect(result.code).toBe(CompassErrorCodeEnum.UNKNOWN);
		expect(result.message).toBe("Message");
		expect(result.origin).toBe("COMPASS");
		expect(result.details).toStrictEqual([
			{
				foo: "bar",
			},
		]);
	});
});
