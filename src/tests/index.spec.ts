import { Column } from "../lib/decorators/column";
import { Entity } from "../lib/decorators/entity/entity";
import { PrimaryColumn } from "../lib/decorators/primary-column";
import { LocalConnection } from "./constants/test-connection";

@Entity()
class Test {
	@PrimaryColumn()
	public id: string;

	@Column()
	public test: string;
}

describe("Generic", () => {
	let connection: LocalConnection;

	beforeAll(() => {
		connection = new LocalConnection({
			entities: [Test],
			prefix: {
				entity: {
					add: "test_",
				},
			},
		});
	});

	it("should define metadata correctly", () => {
		const result = connection.metadataManager.getAllEntitiesMetadata();

		expect(result).toStrictEqual({
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
