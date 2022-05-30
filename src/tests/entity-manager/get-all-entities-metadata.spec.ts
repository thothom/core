import { Column } from "../../lib/decorators/columns/column";
import { PrimaryColumn } from "../../lib/decorators/columns/primary-column";
import { Entity } from "../../lib/decorators/entities/entity";
import { SubEntity } from "../../lib/decorators/entities/sub-entity";
import { ThothError } from "../../lib/error";
import { TestConnection } from "../constants/test-connection";

describe("EntityManager > constructor + getAllEntitiesMetadata", () => {
	it("should get basic entity metadata", async () => {
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

		expect(connection.entityManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestEntity: {
				columns: [
					{ databaseName: "id", name: "id", primary: true, type: String },
					{ databaseName: "foo", name: "foo", type: Number },
				],
				databaseName: "TestEntity",
				name: "TestEntity",
			},
		});
	});

	it("should not format entity name if it is passed as param", async () => {
		@Entity("CUSTOM_ENTITY_NAME")
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;
		}

		const connection = new TestConnection({
			entities: [TestEntity],
			namingStrategy: {
				entity: "snake_case",
			},
			suffix: {
				entity: {
					remove: "Entity",
				},
			},
		});
		await connection.load();

		expect(connection.entityManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestEntity: {
				columns: [
					{ databaseName: "id", name: "id", primary: true, type: String },
					{ databaseName: "foo", name: "foo", type: Number },
				],
				isNameAlreadyFormatted: true,
				databaseName: "CUSTOM_ENTITY_NAME",
				name: "TestEntity",
			},
		});
	});

	it("should get entity + sub-entity metadata (without specify sub-entity at connection options)", async () => {
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

		expect(connection.entityManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestEntity: {
				columns: [
					{ databaseName: "id", name: "id", primary: true, type: String },
					{ databaseName: "foo", name: "foo", type: Number },
					{ databaseName: "testSub", name: "testSub", type: TestSubEntity },
				],
				databaseName: "TestEntity",
				name: "TestEntity",
			},
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestSubEntity: {
				columns: [{ databaseName: "bar", name: "bar", type: Number }],
				databaseName: "TestSubEntity",
				isSubEntity: true,
				isNameAlreadyFormatted: true,
				name: "TestSubEntity",
			},
		});
	});

	it("should get entity + sub-entity + sub-sub-entity metadata", async () => {
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

		expect(connection.entityManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestEntity: {
				columns: [
					{ databaseName: "id", name: "id", primary: true, type: String },
					{ databaseName: "foo", name: "foo", type: Number },
					{ databaseName: "testSub", name: "testSub", type: TestSubEntity },
				],
				databaseName: "TestEntity",
				name: "TestEntity",
			},
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestSubEntity: {
				columns: [
					{
						databaseName: "subSubEntity",
						name: "subSubEntity",
						type: TestSubSubEntity,
					},
				],
				databaseName: "TestSubEntity",
				isSubEntity: true,
				isNameAlreadyFormatted: true,
				name: "TestSubEntity",
			},
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestSubSubEntity: {
				columns: [{ databaseName: "bar", name: "bar", type: Number }],
				databaseName: "TestSubSubEntity",
				isSubEntity: true,
				isNameAlreadyFormatted: true,
				name: "TestSubSubEntity",
			},
		});
	});

	it("should get entity metadata with naming strategy", async () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;
		}

		const connection = new TestConnection({
			entities: [TestEntity],
			namingStrategy: {
				column: "UPPER_CASE",
			},
		});
		await connection.load();

		expect(connection.entityManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestEntity: {
				columns: [
					{ databaseName: "ID", name: "id", primary: true, type: String },
					{ databaseName: "FOO", name: "foo", type: Number },
				],
				databaseName: "TestEntity",
				name: "TestEntity",
			},
		});
	});

	it("should get entity metadata with prefix add", async () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;
		}

		const connection = new TestConnection({
			entities: [TestEntity],
			prefix: {
				column: {
					add: "test_",
				},
			},
		});
		await connection.load();

		expect(connection.entityManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestEntity: {
				columns: [
					{ databaseName: "test_id", name: "id", primary: true, type: String },
					{ databaseName: "test_foo", name: "foo", type: Number },
				],
				databaseName: "TestEntity",
				name: "TestEntity",
			},
		});
	});

	it("should get entity metadata with prefix remove", async () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public testId: string;

			@Column()
			public testFoo: number;
		}

		const connection = new TestConnection({
			entities: [TestEntity],
			prefix: {
				column: {
					remove: "test",
				},
			},
		});
		await connection.load();

		expect(connection.entityManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestEntity: {
				columns: [
					{ databaseName: "Id", name: "testId", primary: true, type: String },
					{ databaseName: "Foo", name: "testFoo", type: Number },
				],
				databaseName: "TestEntity",
				name: "TestEntity",
			},
		});
	});

	it("should get entity metadata with prefix remove and naming strategy", async () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public testId: string;

			@Column()
			public testFoo: number;
		}

		const connection = new TestConnection({
			entities: [TestEntity],
			namingStrategy: {
				column: "camelCase",
			},
			prefix: {
				column: {
					remove: "test",
				},
			},
		});
		await connection.load();

		expect(connection.entityManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestEntity: {
				columns: [
					{ databaseName: "id", name: "testId", primary: true, type: String },
					{ databaseName: "foo", name: "testFoo", type: Number },
				],
				databaseName: "TestEntity",
				name: "TestEntity",
			},
		});
	});

	it("should throw error with duplicated entity", async () => {
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
				entities: [TestEntity, TestEntity],
			});
			await connection.load();
		} catch (err) {
			result = err;
		}

		expect(result instanceof ThothError).toBe(true);
		expect(result.message).toBe("Duplicated Entity");
		expect(result.code).toBe("DUPLICATED_ENTITY");
		expect(result.origin).toBe("THOTHOM");
		expect(result.details).toStrictEqual(["Entity: TestEntity"]);
	});

	it("should get basic entity metadata with naming strategy", async () => {
		@Entity()
		class TestFooEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;
		}

		const connection = new TestConnection({
			entities: [TestFooEntity],
			namingStrategy: {
				entity: "snake_case",
			},
		});
		await connection.load();

		expect(connection.entityManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestFooEntity: {
				columns: [
					{ databaseName: "id", name: "id", primary: true, type: String },
					{ databaseName: "foo", name: "foo", type: Number },
				],
				databaseName: "test_foo_entity",
				name: "TestFooEntity",
			},
		});
	});

	it("should get entity + sub-entity metadata with naming strategy", async () => {
		@SubEntity()
		class TestSubEntity {
			@Column()
			public bar: number;
		}

		@Entity()
		class TestFooEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;

			@Column()
			public testSub: TestSubEntity;
		}

		const connection = new TestConnection({
			entities: [TestFooEntity],
			namingStrategy: {
				entity: "snake_case",
			},
		});
		await connection.load();

		expect(connection.entityManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestFooEntity: {
				columns: [
					{
						databaseName: "id",
						name: "id",
						primary: true,
						type: String,
					},
					{
						databaseName: "foo",
						name: "foo",
						type: Number,
					},
					{
						databaseName: "testSub",
						name: "testSub",
						type: TestSubEntity,
					},
				],
				databaseName: "test_foo_entity",
				name: "TestFooEntity",
			},
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestSubEntity: {
				columns: [
					{
						databaseName: "bar",
						name: "bar",
						type: Number,
					},
				],
				databaseName: "TestSubEntity",
				isSubEntity: true,
				isNameAlreadyFormatted: true,
				name: "TestSubEntity",
			},
		});
	});

	it("should get entity + sub-entity metadata (when sub-entity is also a table)", async () => {
		@Entity()
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
			entities: [TestEntity, TestSubEntity],
		});
		await connection.load();

		expect(connection.entityManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestEntity: {
				columns: [
					{
						databaseName: "id",
						name: "id",
						primary: true,
						type: String,
					},
					{
						databaseName: "foo",
						name: "foo",
						type: Number,
					},
					{
						databaseName: "testSub",
						name: "testSub",
						type: TestSubEntity,
					},
				],
				databaseName: "TestEntity",
				name: "TestEntity",
			},
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestSubEntity: {
				columns: [
					{
						databaseName: "bar",
						name: "bar",
						type: Number,
					},
				],
				databaseName: "TestSubEntity",
				name: "TestSubEntity",
			},
		});
	});
});
