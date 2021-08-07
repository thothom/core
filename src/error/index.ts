import { CompassErrorCodeEnum } from "./types/error-code.enum";

interface CustomErrorParams {
	code: CompassErrorCodeEnum;
	origin: "COMPASS" | "DATABASE";
	message: string;
	details: Array<any>;
}

class CustomError extends Error {
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

export class CompassError {
	public static throw(params: CustomErrorParams) {
		throw new CustomError(params);
	}
}
