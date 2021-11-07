export type EntityType<T> = Omit<
	T,
	| "runAfterDelete"
	| "runAfterFind"
	| "runAfterSave"
	| "runAfterUpdate"
	| "runBeforeDelete"
	| "runBeforeFind"
	| "runBeforeSave"
	| "runBeforeUpdate"
>;
