import { Column } from "../../lib/decorators/columns/column";
import { Entity } from "../../lib/decorators/entity";
import { PrimaryColumn } from "../../lib/decorators/columns/primary-column";
import { SymbiosisError } from "../../lib/error";
import { TestConnection } from "../constants/test-connection";

describe("EntityManager > getColumnMetadata", () => {
	it("should get primary-column metadata", () => {
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
			connection.entityManager.getColumnMetadata(TestEntity, "id"),
		).toStrictEqual({
			databaseName: "id",
			name: "id",
			primary: true,
			type: String,
		});
	});

	it("should get column metadata", () => {
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
			connection.entityManager.getColumnMetadata(TestEntity, "foo"),
		).toStrictEqual({
			databaseName: "foo",
			name: "foo",
			type: Number,
		});
	});

	it("should get sub-entity column metadata metadata", () => {
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

		expect(
			connection.entityManager.getColumnMetadata(TestSubEntity, "bar"),
		).toStrictEqual({
			databaseName: "bar",
			name: "bar",
			type: Number,
		});
	});

	it("should get sub-sub-entity column metadata", () => {
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

		expect(
			connection.entityManager.getColumnMetadata(TestSubSubEntity, "bar"),
		).toStrictEqual({
			databaseName: "bar",
			name: "bar",
			type: Number,
		});
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
			connection.entityManager.getColumnMetadata(TestEntity, "foo");
		} catch (err) {
			result = err;
		}

		expect(result instanceof SymbiosisError).toBe(true);
		expect(result.message).toBe("Entity not Registered");
		expect(result.code).toBe("ENTITY_ERROR");
		expect(result.origin).toBe("SYMBIOSIS");
		expect(result.details).toStrictEqual(["Entity: ", TestEntity]);
	});

	it("should throw error if columns doesn't exist", () => {
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

		let result: any;

		try {
			connection.entityManager.getColumnMetadata(TestEntity, "bar");
		} catch (err) {
			result = err;
		}

		expect(result instanceof SymbiosisError).toBe(true);
		expect(result.message).toBe("Column not found");
		expect(result.code).toBe("COLUMN_ERROR");
		expect(result.origin).toBe("SYMBIOSIS");
		expect(result.details).toStrictEqual([
			"Entity: ",
			TestEntity,
			"Column: ",
			"bar",
		]);
	});
});
