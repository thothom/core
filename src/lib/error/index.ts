import { SymbiosisErrorCodeEnum } from "./types/error-code.enum";

interface CustomErrorParams {
	code: SymbiosisErrorCodeEnum;
	origin: "DATABASE" | "SYMBIOSIS";
	message: string;
	details: Array<any>;
}

export class SymbiosisError extends Error {
	public code: CustomErrorParams["code"];

	public origin: CustomErrorParams["origin"];

	public details: CustomErrorParams["details"];

	public constructor({ message, code, origin, details }: CustomErrorParams) {
		super(message);

		this.code = code;
		this.origin = origin;
		this.details = details;
		this.stack = JSON.stringify({ message, code, origin, details }, null, "\t");
	}
}
