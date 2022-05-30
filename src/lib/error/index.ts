import type { ThothErrorCode } from "../types/error-code";

interface CustomErrorParams {
	code: ThothErrorCode;
	origin: "DATABASE" | "THOTHOM";
	message: string;
	details: Array<any>;
}

export class ThothError extends Error {
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
