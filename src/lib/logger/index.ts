import { getLogLevels } from "./helpers/get-log-levels";
import { printMessage } from "./helpers/print-message";
import { DetailedLogOptions, LogLevel } from "./types/log-level";

export class Logger {
	public readonly connectionName: string;

	public readonly logLevels: LogLevel;

	public constructor(connectionName: string, bruteLogLevel?: LogLevel) {
		this.connectionName = connectionName;
		this.logLevels = getLogLevels(bruteLogLevel);
	}

	public warn(message: any) {
		if (!this.isLevelEnabled("WARN")) {
			return;
		}

		printMessage({
			message,
			logLevel: "WARN",
			connectionName: this.connectionName,
		});
	}

	public error(message: any) {
		if (!this.isLevelEnabled("ERROR")) {
			return;
		}

		printMessage({
			message,
			logLevel: "ERROR",
			writeStreamType: "stderr",
			connectionName: this.connectionName,
		});
	}

	public log(message: any) {
		if (!this.isLevelEnabled("LOG")) {
			return;
		}

		printMessage({
			message,
			logLevel: "LOG",
			connectionName: this.connectionName,
		});
	}

	public debug(message: any) {
		if (!this.isLevelEnabled("DEBUG")) {
			return;
		}

		printMessage({
			message,
			logLevel: "DEBUG",
			connectionName: this.connectionName,
		});
	}

	public info(message: any) {
		if (!this.isLevelEnabled("INFO")) {
			return;
		}

		printMessage({
			message,
			logLevel: "INFO",
			connectionName: this.connectionName,
		});
	}

	private isLevelEnabled(level: DetailedLogOptions) {
		return this.logLevels.includes(level);
	}
}
