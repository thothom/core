import { CosmosError } from "../../lib/error";
import { CosmosErrorCodeEnum } from "../../lib/error/types/error-code.enum";

describe("CosmosError", () => {
	it("should throw error correctly (simple details)", () => {
		let result;

		try {
			throw new CosmosError({
				message: "Message",
				code: CosmosErrorCodeEnum.UNKNOWN,
				origin: "COSMOS",
				details: ["Details"],
			});
		} catch (err) {
			result = err;
		}

		expect(result instanceof Error).toBe(true);
		expect(result instanceof CosmosError).toBe(true);
		expect(result).toHaveProperty("stack");
		expect(result.code).toBe(CosmosErrorCodeEnum.UNKNOWN);
		expect(result.message).toBe("Message");
		expect(result.origin).toBe("COSMOS");
		expect(result.details).toStrictEqual(["Details"]);
	});

	it("should throw error correctly (complex details)", () => {
		let result;

		try {
			throw new CosmosError({
				message: "Message",
				code: CosmosErrorCodeEnum.UNKNOWN,
				origin: "COSMOS",
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
		expect(result instanceof CosmosError).toBe(true);
		expect(result).toHaveProperty("stack");
		expect(result.code).toBe(CosmosErrorCodeEnum.UNKNOWN);
		expect(result.message).toBe("Message");
		expect(result.origin).toBe("COSMOS");
		expect(result.details).toStrictEqual([
			{
				foo: "bar",
			},
		]);
	});
});
