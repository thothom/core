export type HighLevelLogOptions = "ALL_INTERNAL" | "ALL" | "MINIMUM" | "NONE";

export type DetailedLogOptions = "DEBUG" | "ERROR" | "INFO" | "LOG" | "WARN";

export type LogLevel = Array<DetailedLogOptions> | HighLevelLogOptions;
