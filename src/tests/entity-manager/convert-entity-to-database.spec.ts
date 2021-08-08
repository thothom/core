/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { Column } from "../../lib/decorators/column";
import { Entity } from "../../lib/decorators/entity/entity";
import { PrimaryColumn } from "../../lib/decorators/primary-column";
import { LocalConnection } from "../constants/test-connection";

@Entity({
	isSubEntity: true,
})
class SubSubTestEntity {
	@Column()
	public subField: string;
}

@Entity()
class SubTestEntity {
	@Column()
	public field: string;

	@Column()
	public subTest: SubSubTestEntity;
}

@Entity()
class TestEntity {
	@PrimaryColumn()
	public id: string;

	@Column()
	public test: string;

	@Column()
	public subEntity: SubTestEntity;
}

describe("EntityManager > convertEntityToDatabase", () => {
	let connection: LocalConnection;

	beforeAll(() => {
		connection = new LocalConnection({
			entities: [TestEntity],
			prefix: {
				column: {
					add: "test_",
				},
			},
			suffix: {
				entity: {
					remove: "Entity",
				},
			},
		});
	});

	it("should convert partial data correctly", () => {
		const result = connection.metadataManager.convertEntityToDatabase({
			entity: TestEntity,
			data: {
				id: "Test",
				test: "SuperTest",
				subEntity: {
					field: "field",
				},
			},
		});

		expect(result).toStrictEqual({
			test_id: "Test",
			test_test: "SuperTest",
			test_subEntity: {
				test_field: "field",
			},
		});
	});

	it("should convert data correctly", () => {
		const result = connection.metadataManager.convertEntityToDatabase({
			entity: TestEntity,
			data: {
				id: "Test",
				test: "SuperTest",
				subEntity: {
					field: "field",
					subTest: {
						subField: "subField",
					},
				},
			},
		});

		expect(result).toStrictEqual({
			test_id: "Test",
			test_test: "SuperTest",
			test_subEntity: {
				test_field: "field",
				test_subTest: {
					subField: "subField",
				},
			},
		});
	});
});
