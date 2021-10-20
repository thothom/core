import { Column } from "../../lib/decorators/columns/column";
import { Entity } from "../../lib/decorators/entity";
import { PrimaryColumn } from "../../lib/decorators/columns/primary-column";
import { SymbiosisError } from "../../lib/error";
import { SymbiosisErrorCodeEnum } from "../../lib/error/types/error-code.enum";
import { TestConnection } from "../constants/test-connection";

describe("EntityManager > getEntityMetadata", () => {
	it("should get entity metadata", () => {
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

	it("should get sub-entity metadata", () => {
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
			connection.entityManager.getEntityMetadata(TestSubEntity),
		).toStrictEqual({
			columns: [{ databaseName: "bar", name: "bar", type: Number }],
			databaseName: "TestSubEntity",
			isSubEntity: true,
			name: "TestSubEntity",
		});
	});

	it("should get sub-sub-entity metadata", () => {
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
			connection.entityManager.getEntityMetadata(TestSubSubEntity),
		).toStrictEqual({
			columns: [{ databaseName: "bar", name: "bar", type: Number }],
			databaseName: "TestSubSubEntity",
			isSubEntity: true,
			name: "TestSubSubEntity",
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
			connection.entityManager.getEntityMetadata(TestEntity);
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
