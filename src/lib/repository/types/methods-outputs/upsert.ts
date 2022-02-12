export interface BaseUpsertOutput<T> {
	data: Array<T>;
	cursor?: any;
}
