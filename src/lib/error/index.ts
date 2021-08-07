import { CompassErrorCodeEnum } from "./types/error-code.enum";

interface CustomErrorParams {
	code: CompassErrorCodeEnum;
	origin: "COMPASS" | "DATABASE";
	message: string;
	details: Array<any>;
}

export class CompassError extends Error {
	public code: CustomErrorParams["code"];

	public origin: CustomErrorParams["origin"];

	public details: CustomErrorParams["details"];

	public constructor({ message, code, origin, details }: CustomErrorParams) {
		super(message);

		this.name = "CompassOrmError";
		this.code = code;
		this.origin = origin;
		this.details = details;
	}
}
