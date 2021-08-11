import { DetailedLogOptions } from "../types/log-level";
import { addColor } from "./add-color";
import { getTimestamp } from "./get-timestamp";

interface PrintMessageParams {
	writeStreamType?: "stderr" | "stdout";
	message: any;
	logLevel: DetailedLogOptions;
	connectionName: string;
}

const getOutput = (message: any) => {
	if (["string", "number"].includes(typeof message)) {
		return message;
	}

	return JSON.stringify(message);
};

export const printMessage = ({
	writeStreamType,
	message,
	logLevel,
	connectionName,
}: PrintMessageParams) => {
	const LOG_LEVEL_SPACE = 7;

	const pidMessage = addColor({
		logLevel,
		message: `[Compass] ${process.pid}  - `,
	});
	const timestamp = getTimestamp();
	const formattedLogLevel = addColor({
		logLevel,
		message: logLevel.toUpperCase().padStart(LOG_LEVEL_SPACE, " "),
	});
	const output = getOutput(message);

	process[writeStreamType || "stdout"].write(
		`${pidMessage}${timestamp} ${formattedLogLevel} [${connectionName}] ${output}\n`,
	);
};
