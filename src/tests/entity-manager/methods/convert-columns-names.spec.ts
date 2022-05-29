/* eslint-disable sonarjs/no-duplicate-string */

import { Column } from "../../../lib/decorators/columns/column";
import { PrimaryColumn } from "../../../lib/decorators/columns/primary-column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { SubEntity } from "../../../lib/decorators/entities/sub-entity";
import { ThothError } from "../../../lib/error";
import { TestConnection } from "../../constants/test-connection";

const createConnection = async (entities: Array<any>) => {
	const connection = new TestConnection({
		entities,
		namingStrategy: {
			column: "UPPER_CASE",
		},
	});
	await connection.load();

	return connection;
};

describe("EntityMetadata > convertColumnsNames", () => {
	describe("With simple entity", () => {
		let connection: TestConnection;

		@Entity()
		class TestEntity {
			@Column()
			public id: string;

			@Column()
			public test: string;
		}

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should convert columns", () => {
			const result = connection.entityManager.convertColumnsNames({
				entity: TestEntity,
				columnsNames: ["id", "test"],
			});

			expect(result).toStrictEqual(["ID", "TEST"]);
		});
	});

	describe("Simple Entity with custom column names", () => {
		it("should convert columns if it is passed on primary-column param", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn("CUSTOM_FIELD_NAME")
				public id: string;

				@Column()
				public test: string;
			}

			const connection = await createConnection([TestEntity]);

			const result = connection.entityManager.convertColumnsNames({
				entity: TestEntity,
				columnsNames: ["id", "test"],
			});

			expect(result).toStrictEqual(["CUSTOM_FIELD_NAME", "TEST"]);
		});

		it("should convert columns if it is passed on column options", async () => {
			@Entity()
			class TestEntity {
				@Column()
				public id: string;

				@Column({
					name: "CUSTOM_FIELD_NAME",
				})
				public test: string;
			}

			const connection = await createConnection([TestEntity]);

			const result = connection.entityManager.convertColumnsNames({
				entity: TestEntity,
				columnsNames: ["id", "test"],
			});

			expect(result).toStrictEqual(["ID", "CUSTOM_FIELD_NAME"]);
		});
	});

	describe("Entity with SubEntity", () => {
		let connection: TestConnection;

		@SubEntity()
		class SubTestEntity {
			@Column()
			public field?: string;

			@Column()
			public anotherField: number;
		}

		@Entity()
		class TestEntity {
			@Column()
			public id: string;

			@Column()
			public subEntity: SubTestEntity;
		}

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should convert columns with multilevel", () => {
			const result = connection.entityManager.convertColumnsNames({
				entity: TestEntity,
				columnsNames: ["id", "subEntity.field"],
			});

			expect(result).toStrictEqual(["ID", "SUB_ENTITY.FIELD"]);
		});

		it("should convert columns with multilevel (all the sub-columns)", () => {
			const result = connection.entityManager.convertColumnsNames({
				entity: TestEntity,
				columnsNames: ["id", "subEntity"],
			});

			expect(result).toStrictEqual(["ID", "SUB_ENTITY"]);
		});

		it("should throw error because wrong column type", () => {
			let result: any;

			try {
				result = connection.entityManager.convertColumnsNames({
					entity: TestEntity,
					columnsNames: ["id.field", "subEntity"],
				});
			} catch (err) {
				result = err;
			}

			expect(result instanceof ThothError).toBeTruthy();
			expect(result.message).toBe("Invalid column");
			expect(result.code).toBe("INVALID_PARAM");
			expect(result.origin).toBe("THOTHOM");
			expect(result.details).toStrictEqual([
				"Invalid column: id",
				'This column has the "String" type, and it cannot be used as an multiple level column',
				"Value received: id.field",
			]);
		});
	});

	describe("Entity with array of SubEntities", () => {
		let connection: TestConnection;

		@SubEntity()
		class SubTestEntity {
			@Column()
			public field?: string;

			@Column()
			public anotherField: number;
		}

		@Entity()
		class TestEntity {
			@Column()
			public id: string;

			@Column(SubTestEntity)
			public subEntity: Array<SubTestEntity>;
		}

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should convert columns with multilevel", () => {
			const result = connection.entityManager.convertColumnsNames({
				entity: TestEntity,
				columnsNames: ["id", "subEntity[].field"],
			});

			expect(result).toStrictEqual(["ID", "SUB_ENTITY[].FIELD"]);
		});
	});
});
