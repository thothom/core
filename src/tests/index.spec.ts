import { Connection } from "../lib/connection";
import { Repository } from "../lib/connection/types/repository";
import { Column } from "../lib/decorators/column";
import { Entity } from "../lib/decorators/entity/entity";
import { PrimaryColumn } from "../lib/decorators/primary-column";

@Entity()
class Test {
	@PrimaryColumn()
	public id: string;

	@Column()
	public test: string;
}

class LocalConnection extends Connection<any, any> {
	public getRepository<Entity>(_entity: Entity) {
		return {} as Repository<Entity>;
	}
}

describe("Generic", () => {
	it("should define metadata correctly", () => {
		// eslint-disable-next-line no-new
		const connection = new LocalConnection({
			entities: [Test],
			prefix: {
				entity: {
					add: "test_",
				},
			},
		});

		expect(connection.metadataManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			Test: {
				name: "Test",
				databaseName: "test_Test",
				extras: undefined,
				columns: [
					{
						name: "id",
						databaseName: "id",
						primary: true,
						extras: undefined,
						type: String,
					},
					{
						name: "test",
						databaseName: "test",
						extras: undefined,
						isArray: undefined,
						type: String,
					},
				],
			},
		});
	});
});
