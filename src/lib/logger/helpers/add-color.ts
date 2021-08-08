import { DetailedLogOptions } from "../types/log-level";

interface AddColorParams {
	message: string;
	logLevel: DetailedLogOptions;
}

export const addColor = ({ message, logLevel }: AddColorParams) => {
	switch (logLevel) {
		case "DEBUG":
			// Magenta
			return `\x1B[95m${message}\x1B[39m;`;
		case "ERROR":
			// Red
			return `\x1B[31m${message}\x1B[39m`;
		case "WARN":
			// Yellow
			return `\x1B[33m${message}\x1B[39m`;
		case "INFO":
			// Cyan
			return `\x1B[96m${message}\x1B[39m`;
		case "LOG":
		default:
			// Green
			return `\x1B[32m${message}\x1B[39m`;
	}
};
