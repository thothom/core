import { CosmosErrorCodeEnum } from "./types/error-code.enum";

interface CustomErrorParams {
	code: CosmosErrorCodeEnum;
	origin: "COSMOS" | "DATABASE";
	message: string;
	details: Array<any>;
}

export class CosmosError extends Error {
	public code: CustomErrorParams["code"];

	public origin: CustomErrorParams["origin"];

	public details: CustomErrorParams["details"];

	public constructor({ message, code, origin, details }: CustomErrorParams) {
		super(message);

		this.name = "CosmosOrmError";
		this.code = code;
		this.origin = origin;
		this.details = details;
	}
}
