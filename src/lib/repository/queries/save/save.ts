export type Save<Entity> = (
	data: Array<Partial<Entity>> | Partial<Entity>,
) => Promise<Array<Entity> | Entity>;
