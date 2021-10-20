import { Column } from "../../lib/decorators/columns/column";
import { Entity } from "../../lib/decorators/entity";
import { PrimaryColumn } from "../../lib/decorators/columns/primary-column";
import { SymbiosisError } from "../../lib/error";
import { SymbiosisErrorCodeEnum } from "../../lib/error/types/error-code.enum";
import { TestConnection } from "../constants/test-connection";

describe("EntityManager > getEntityPrimaryColumns", () => {
	it("should get unique primary-column metadata", () => {
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

	it("should get composite primary-columns metadata", () => {
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

	it("should throw error if entity is not registered", () => {
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

		let result: any;

		try {
			connection.entityManager.getEntityPrimaryColumns(TestEntity);
		} catch (err) {
			result = err;
		}

		expect(result instanceof SymbiosisError).toBe(true);
		expect(result.message).toBe("Entity not Registered");
		expect(result.code).toBe(SymbiosisErrorCodeEnum.ENTITY_ERROR);
		expect(result.origin).toBe("SYMBIOSIS");
		expect(result.details).toStrictEqual(["Entity: ", TestEntity]);
	});
});
