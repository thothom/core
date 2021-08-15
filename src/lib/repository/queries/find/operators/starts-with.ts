import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const StartsWith = (value: string) =>
	new FindOperator<string>({
		type: "startsWith",
		values: [value],
	});
