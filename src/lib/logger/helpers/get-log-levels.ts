import { LogLevel, DetailedLogOptions } from "../../..";

export const getLogLevels = (
	bruteLogLevel?: LogLevel,
): Array<DetailedLogOptions> => {
	switch (bruteLogLevel) {
		case "ALL_INTERNAL":
			return ["DEBUG", "ERROR", "INFO", "LOG", "WARN"];
		case "NONE":
			return [];
		case "ALL":
		case undefined:
			return ["ERROR", "WARN", "LOG"];
		case "MINIMUM":
			return ["ERROR"];
		default:
			return bruteLogLevel;
	}
};
