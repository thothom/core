export type EntityType<T, F extends keyof T | "" = ""> = Omit<
	T,
	| F
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
