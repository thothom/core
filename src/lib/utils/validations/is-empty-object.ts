export const isEmptyObject = (value: any) =>
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	Object.keys(value).length < 1;
