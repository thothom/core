import { DetailedLogOptions } from "../types/log-level";

interface AddColorParams {
	message: string;
	logLevel: DetailedLogOptions;
}

export const addColor = ({ message, logLevel }: AddColorParams) => {
	switch (logLevel) {
		case "DEBUG":
			return `\x1B[96m${message}\x1B[39m;`;
		case "LOG":
			return `\x1B[32m${message}\x1B[39m`;
		case "ERROR":
			return `\x1B[31m${message}\x1B[39m`;
		case "INFO":
			return `\x1B[33m${message}\x1B[39m`;
		default:
			return message;
	}
};
