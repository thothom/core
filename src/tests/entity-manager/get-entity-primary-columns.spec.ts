import { Column } from "../../lib/decorators/column";
import { Entity } from "../../lib/decorators/entity/entity";
import { PrimaryColumn } from "../../lib/decorators/primary-column";
import { CompassError } from "../../lib/error";
import { CompassErrorCodeEnum } from "../../lib/error/types/error-code.enum";
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
			connection.metadataManager.getEntityPrimaryColumns(TestEntity),
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
			connection.metadataManager.getEntityPrimaryColumns(TestEntity),
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

		let result;

		try {
			connection.metadataManager.getEntityPrimaryColumns(TestEntity);
		} catch (err) {
			result = err;
		}

		expect(result instanceof CompassError).toBe(true);
		expect(result.message).toBe("Entity not Registered");
		expect(result.code).toBe(CompassErrorCodeEnum.ENTITY_ERROR);
		expect(result.origin).toBe("COMPASS");
		expect(result.details).toStrictEqual(["Entity: ", TestEntity]);
	});
});
