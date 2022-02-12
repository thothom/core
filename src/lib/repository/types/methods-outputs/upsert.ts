export interface UpsertOutput<T> {
	data: Array<T>;
	cursor?: string;
}
