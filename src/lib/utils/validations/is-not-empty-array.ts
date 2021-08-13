export const isNotEmptyArray = (value?: any) =>
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	Array.isArray(value) && value.length > 0;
