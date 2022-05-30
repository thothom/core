import { ThothError } from "../../lib/error";

describe("ThothError", () => {
	it("should throw error correctly (simple details)", () => {
		let result: any;

		try {
			throw new ThothError({
				message: "Message",
				code: "UNKNOWN",
				origin: "THOTHOM",
				details: ["Details"],
			});
		} catch (err) {
			result = err;
		}

		expect(result instanceof Error).toBe(true);
		expect(result instanceof ThothError).toBe(true);
		expect(result).toHaveProperty("stack");
		expect(result.code).toBe("UNKNOWN");
		expect(result.message).toBe("Message");
		expect(result.origin).toBe("THOTHOM");
		expect(result.details).toStrictEqual(["Details"]);
	});

	it("should throw error correctly (complex details)", () => {
		let result: any;

		try {
			throw new ThothError({
				message: "Message",
				code: "UNKNOWN",
				origin: "THOTHOM",
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
		expect(result instanceof ThothError).toBe(true);
		expect(result).toHaveProperty("stack");
		expect(result.code).toBe("UNKNOWN");
		expect(result.message).toBe("Message");
		expect(result.origin).toBe("THOTHOM");
		expect(result.details).toStrictEqual([
			{
				foo: "bar",
			},
		]);
	});
});
