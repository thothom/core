export const isEmptyArray = (value?: any) =>
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	Array.isArray(value) && value.length < 1;
