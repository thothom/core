import { Column } from "../../lib/decorators/column";
import { Entity } from "../../lib/decorators/entity/entity";
import { PrimaryColumn } from "../../lib/decorators/primary-column";
import { CompassError } from "../../lib/error";
import { CompassErrorCodeEnum } from "../../lib/error/types/error-code.enum";
import { TestConnection } from "../constants/test-connection";

describe("EntityManager > constructor + getAllEntitiesMetadata", () => {
	it("should get basic entity metadata", () => {
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

		expect(connection.metadataManager.getAllEntitiesMetadata()).toStrictEqual({
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

	it("should not format entity name if it is passed as param", () => {
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

		expect(connection.metadataManager.getAllEntitiesMetadata()).toStrictEqual({
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

	it("should get entity + sub-entity metadata (without specify sub-entity at connection options)", () => {
		@Entity({
			isSubEntity: true,
		})
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

		expect(connection.metadataManager.getAllEntitiesMetadata()).toStrictEqual({
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
				name: "TestSubEntity",
			},
		});
	});

	it("should get entity + sub-entity + sub-sub-entity metadata", () => {
		@Entity({ isSubEntity: true })
		class TestSubSubEntity {
			@Column()
			public bar: number;
		}

		@Entity({ isSubEntity: true })
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

		expect(connection.metadataManager.getAllEntitiesMetadata()).toStrictEqual({
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
				name: "TestSubEntity",
			},
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestSubSubEntity: {
				columns: [{ databaseName: "bar", name: "bar", type: Number }],
				databaseName: "TestSubSubEntity",
				isSubEntity: true,
				name: "TestSubSubEntity",
			},
		});
	});

	it("should get entity metadata with naming strategy", () => {
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

		expect(connection.metadataManager.getAllEntitiesMetadata()).toStrictEqual({
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

	it("should get entity metadata with prefix add", () => {
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

		expect(connection.metadataManager.getAllEntitiesMetadata()).toStrictEqual({
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

	it("should get entity metadata with prefix remove", () => {
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

		expect(connection.metadataManager.getAllEntitiesMetadata()).toStrictEqual({
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

	it("should get entity metadata with prefix remove and naming strategy", () => {
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

		expect(connection.metadataManager.getAllEntitiesMetadata()).toStrictEqual({
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

	it("should throw error with duplicated entity", () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;
		}

		let result;

		try {
			// eslint-disable-next-line no-new
			new TestConnection({
				entities: [TestEntity, TestEntity],
			});
		} catch (err) {
			result = err;
		}

		expect(result instanceof CompassError).toBe(true);
		expect(result.message).toBe("Duplicated Entity");
		expect(result.code).toBe(CompassErrorCodeEnum.DUPLICATED_ENTITY);
		expect(result.origin).toBe("COMPASS");
		expect(result.details).toStrictEqual(["Entity: TestEntity"]);
	});

	it("should get basic entity metadata with naming strategy", () => {
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

		expect(connection.metadataManager.getAllEntitiesMetadata()).toStrictEqual({
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

	it("should get entity + sub-entity metadata with naming strategy", () => {
		@Entity({
			isSubEntity: true,
		})
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

		expect(connection.metadataManager.getAllEntitiesMetadata()).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestFooEntity: {
				columns: [
					{ databaseName: "id", name: "id", primary: true, type: String },
					{ databaseName: "foo", name: "foo", type: Number },
					{ databaseName: "testSub", name: "testSub", type: TestSubEntity },
				],
				databaseName: "test_foo_entity",
				name: "TestFooEntity",
			},
			// eslint-disable-next-line @typescript-eslint/naming-convention
			TestSubEntity: {
				columns: [{ databaseName: "bar", name: "bar", type: Number }],
				databaseName: "test_sub_entity",
				isSubEntity: true,
				name: "TestSubEntity",
			},
		});
	});

	it("should get entity + sub-entity metadata (when sub-entity is also a table)", () => {
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

		expect(connection.metadataManager.getAllEntitiesMetadata()).toStrictEqual({
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
				name: "TestSubEntity",
			},
		});
	});
});
