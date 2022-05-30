import { Column } from "../../lib/decorators/columns/column";
import { PrimaryColumn } from "../../lib/decorators/columns/primary-column";
import { Entity } from "../../lib/decorators/entities/entity";
import { SubEntity } from "../../lib/decorators/entities/sub-entity";
import { ThothError } from "../../lib/error";
import { TestConnection } from "../constants/test-connection";

describe("EntityManager > getEntityMetadata", () => {
	it("should get entity metadata", async () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;
		}

		let result: any;

		try {
			const connection = new TestConnection({
				entities: [TestEntity],
			});
			await connection.load();

			result = connection.entityManager.getEntityMetadata(TestEntity);
		} catch (err: any) {
			result = err;
		}

		expect(result).toStrictEqual({
			columns: [
				{ databaseName: "id", name: "id", primary: true, type: String },
				{ databaseName: "foo", name: "foo", type: Number },
			],
			databaseName: "TestEntity",
			name: "TestEntity",
		});
	});

	it("should get sub-entity metadata", async () => {
		@SubEntity()
		class TestSubEntity {
			@Column()
			public bar: number;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;

			@Column()
			public testSub: TestSubEntity;
		}

		const connection = new TestConnection({
			entities: [TestEntity],
		});
		await connection.load();

		expect(
			connection.entityManager.getEntityMetadata(TestSubEntity),
		).toStrictEqual({
			columns: [{ databaseName: "bar", name: "bar", type: Number }],
			databaseName: "TestSubEntity",
			isSubEntity: true,
			isNameAlreadyFormatted: true,
			name: "TestSubEntity",
		});
	});

	it("should get sub-sub-entity metadata", async () => {
		@SubEntity()
		class TestSubSubEntity {
			@Column()
			public bar: number;
		}

		@SubEntity()
		class TestSubEntity {
			@Column()
			public subSubEntity: TestSubSubEntity;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;

			@Column()
			public testSub: TestSubEntity;
		}

		const connection = new TestConnection({
			entities: [TestEntity],
		});
		await connection.load();

		expect(
			connection.entityManager.getEntityMetadata(TestSubSubEntity),
		).toStrictEqual({
			columns: [{ databaseName: "bar", name: "bar", type: Number }],
			databaseName: "TestSubSubEntity",
			isSubEntity: true,
			isNameAlreadyFormatted: true,
			name: "TestSubSubEntity",
		});
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
			connection.entityManager.getEntityMetadata(TestEntity);
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
