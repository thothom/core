import type { SaveOperator } from "../operators/save/base";

type InternalSaveData<T> = {
	[P in keyof T]?: InternalSaveData<T[P]> | SaveOperator;
};

export type ArraySaveData<Entity> = Array<InternalSaveData<Entity>>;

export type SingleSaveData<Entity> = InternalSaveData<Entity>;

export type SaveData<Entity> = ArraySaveData<Entity> | SingleSaveData<Entity>;
