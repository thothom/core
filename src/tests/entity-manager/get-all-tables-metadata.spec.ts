import { Column } from "../../lib/decorators/columns/column";
import { Entity } from "../../lib/decorators/entities/entity";
import { PrimaryColumn } from "../../lib/decorators/columns/primary-column";
import { TestConnection } from "../constants/test-connection";
import { SubEntity } from "../../lib/decorators/entities/sub-entity";

describe("EntityManager > getAllTablesMetadata", () => {
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

		expect(connection.entityManager.getAllTablesMetadata()).toStrictEqual([
			{
				columns: [
					{ databaseName: "id", name: "id", primary: true, type: String },
					{ databaseName: "foo", name: "foo", type: Number },
				],
				databaseName: "TestEntity",
				name: "TestEntity",
			},
		]);
	});

	it("should get only entity metadata (entity + sub-entity)", async () => {
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

		expect(connection.entityManager.getAllTablesMetadata()).toStrictEqual([
			{
				columns: [
					{ databaseName: "id", name: "id", primary: true, type: String },
					{ databaseName: "foo", name: "foo", type: Number },
					{ databaseName: "testSub", name: "testSub", type: TestSubEntity },
				],
				databaseName: "TestEntity",
				name: "TestEntity",
			},
		]);
	});

	it("should get only entity metadata (entity + sub-entity + sub-sub-entity)", async () => {
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

		expect(connection.entityManager.getAllTablesMetadata()).toStrictEqual([
			{
				columns: [
					{ databaseName: "id", name: "id", primary: true, type: String },
					{ databaseName: "foo", name: "foo", type: Number },
					{ databaseName: "testSub", name: "testSub", type: TestSubEntity },
				],
				databaseName: "TestEntity",
				name: "TestEntity",
			},
		]);
	});
});
