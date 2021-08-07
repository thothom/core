import { LogLevel, DetailedLogOptions } from "../../..";

export const getLogLevels = (
	bruteLogLevel?: LogLevel,
): Array<DetailedLogOptions> => {
	switch (bruteLogLevel) {
		case "ALL_INTERNAL":
			return ["DEBUG", "ERROR", "INFO", "LOG"];
		case "NONE":
			return [];
		case "ALL":
			return ["ERROR", "LOG"];
		case "MINIMUM":
		case undefined:
			return ["ERROR"];
		default:
			return bruteLogLevel;
	}
};
