export type EntityType<T> = Omit<
	T,
	| "runAfterDelete"
	| "runAfterFind"
	| "runAfterInsert"
	| "runAfterUpdate"
	| "runAfterUpsert"
	| "runBeforeDelete"
	| "runBeforeFind"
	| "runBeforeInsert"
	| "runBeforeUpdate"
	| "runBeforeUpsert"
>;
