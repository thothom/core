import { SymbiosisError } from "../../lib/error";

describe("SymbiosisError", () => {
	it("should throw error correctly (simple details)", () => {
		let result: any;

		try {
			throw new SymbiosisError({
				message: "Message",
				code: "UNKNOWN",
				origin: "SYMBIOSIS",
				details: ["Details"],
			});
		} catch (err) {
			result = err;
		}

		expect(result instanceof Error).toBe(true);
		expect(result instanceof SymbiosisError).toBe(true);
		expect(result).toHaveProperty("stack");
		expect(result.code).toBe("UNKNOWN");
		expect(result.message).toBe("Message");
		expect(result.origin).toBe("SYMBIOSIS");
		expect(result.details).toStrictEqual(["Details"]);
	});

	it("should throw error correctly (complex details)", () => {
		let result: any;

		try {
			throw new SymbiosisError({
				message: "Message",
				code: "UNKNOWN",
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
		expect(result.code).toBe("UNKNOWN");
		expect(result.message).toBe("Message");
		expect(result.origin).toBe("SYMBIOSIS");
		expect(result.details).toStrictEqual([
			{
				foo: "bar",
			},
		]);
	});
});
