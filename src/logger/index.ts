import { getLogLevels } from "./helpers/get-log-levels";
import { printMessage } from "./helpers/print-message";
import { DetailedLogOptions, LogLevel } from "./types/log-level";

export class Logger {
	private readonly logLevels: LogLevel;

	public constructor(bruteLogLevel?: LogLevel) {
		this.logLevels = getLogLevels(bruteLogLevel);
	}

	public error(message: any) {
		if (!this.isLevelEnabled("ERROR")) {
			return;
		}

		printMessage({
			message,
			logLevel: "ERROR",
			writeStreamType: "stderr",
		});
	}

	public log(message: any) {
		if (!this.isLevelEnabled("LOG")) {
			return;
		}

		printMessage({
			message,
			logLevel: "LOG",
		});
	}

	public debug(message: any) {
		if (!this.isLevelEnabled("DEBUG")) {
			return;
		}

		printMessage({
			message,
			logLevel: "DEBUG",
		});
	}

	public info(message: any) {
		if (!this.isLevelEnabled("INFO")) {
			return;
		}

		printMessage({
			message,
			logLevel: "INFO",
		});
	}

	private isLevelEnabled(level: DetailedLogOptions) {
		return this.logLevels.includes(level);
	}
}
