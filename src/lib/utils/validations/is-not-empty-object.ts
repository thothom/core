export const isNotEmptyObject = (value: any) =>
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	typeof value === "object" && Object.keys(value).length > 0;
