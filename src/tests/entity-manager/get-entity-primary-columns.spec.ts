import { Column } from "../../lib/decorators/columns/column";
import { PrimaryColumn } from "../../lib/decorators/columns/primary-column";
import { Entity } from "../../lib/decorators/entities/entity";
import { ThothError } from "../../lib/error";
import { TestConnection } from "../constants/test-connection";

describe("EntityManager > getEntityPrimaryColumns", () => {
	it("should get unique primary-column metadata", async () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;
		}

		const connection = new TestConnection({
			entities: [TestEntity],
		});
		await connection.load();

		expect(
			connection.entityManager.getEntityPrimaryColumns(TestEntity),
		).toStrictEqual([
			{
				databaseName: "id",
				name: "id",
				primary: true,
				type: String,
			},
		]);
	});

	it("should get composite primary-columns metadata", async () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@PrimaryColumn()
			public foo: number;
		}

		const connection = new TestConnection({
			entities: [TestEntity],
		});
		await connection.load();

		expect(
			connection.entityManager.getEntityPrimaryColumns(TestEntity),
		).toStrictEqual([
			{
				databaseName: "id",
				name: "id",
				primary: true,
				type: String,
			},
			{
				databaseName: "foo",
				name: "foo",
				primary: true,
				type: Number,
			},
		]);
	});

	it("should throw error if entity is not registered", async () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;
		}

		const connection = new TestConnection({
			entities: [],
		});
		await connection.load();

		let result: any;

		try {
			connection.entityManager.getEntityPrimaryColumns(TestEntity);
		} catch (err) {
			result = err;
		}

		expect(result instanceof ThothError).toBe(true);
		expect(result.message).toBe("Entity not Registered");
		expect(result.code).toBe("ENTITY_ERROR");
		expect(result.origin).toBe("THOTHOM");
		expect(result.details).toStrictEqual(["Entity: ", TestEntity]);
	});
});
