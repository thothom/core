export type ClassType<T> = {
	[P in keyof T]?: ClassType<T[P]>;
};
