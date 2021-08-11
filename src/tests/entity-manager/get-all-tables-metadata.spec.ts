import { Column } from "../../lib/decorators/column";
import { Entity } from "../../lib/decorators/entity/entity";
import { PrimaryColumn } from "../../lib/decorators/primary-column";
import { TestConnection } from "../constants/test-connection";

describe("EntityManager > getAllTablesMetadata", () => {
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

		expect(connection.metadataManager.getAllTablesMetadata()).toStrictEqual([
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

	it("should get only entity metadata (entity + sub-entity)", () => {
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

		expect(connection.metadataManager.getAllTablesMetadata()).toStrictEqual([
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

	it("should get only entity metadata (entity + sub-entity + sub-sub-entity)", () => {
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

		expect(connection.metadataManager.getAllTablesMetadata()).toStrictEqual([
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
