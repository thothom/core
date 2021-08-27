import { SymbiosisError } from "../../lib/error";
import { SymbiosisErrorCodeEnum } from "../../lib/error/types/error-code.enum";

describe("SymbiosisError", () => {
	it("should throw error correctly (simple details)", () => {
		let result: any;

		try {
			throw new SymbiosisError({
				message: "Message",
				code: SymbiosisErrorCodeEnum.UNKNOWN,
				origin: "SYMBIOSIS",
				details: ["Details"],
			});
		} catch (err) {
			result = err;
		}

		expect(result instanceof Error).toBe(true);
		expect(result instanceof SymbiosisError).toBe(true);
		expect(result).toHaveProperty("stack");
		expect(result.code).toBe(SymbiosisErrorCodeEnum.UNKNOWN);
		expect(result.message).toBe("Message");
		expect(result.origin).toBe("SYMBIOSIS");
		expect(result.details).toStrictEqual(["Details"]);
	});

	it("should throw error correctly (complex details)", () => {
		let result: any;

		try {
			throw new SymbiosisError({
				message: "Message",
				code: SymbiosisErrorCodeEnum.UNKNOWN,
				origin: "SYMBIOSIS",
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
		expect(result instanceof SymbiosisError).toBe(true);
		expect(result).toHaveProperty("stack");
		expect(result.code).toBe(SymbiosisErrorCodeEnum.UNKNOWN);
		expect(result.message).toBe("Message");
		expect(result.origin).toBe("SYMBIOSIS");
		expect(result.details).toStrictEqual([
			{
				foo: "bar",
			},
		]);
	});
});
