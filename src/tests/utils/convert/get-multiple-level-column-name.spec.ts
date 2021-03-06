import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { SubEntity } from "../../../lib/decorators/entities/sub-entity";
import { ThothError } from "../../../lib/error";
import { TestConnection } from "../../constants/test-connection";

import { getMultipleLevelColumnName } from "../../../lib/utils/convert/get-multiple-level-column-name";

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

describe("getMultipleLevelColumnName", () => {
	describe("With entity with sub-entity", () => {
		let connection: TestConnection;

		@SubEntity()
		class SubTestEntity {
			@Column()
			public field?: string;

			@Column(Number)
			public anotherField: Array<number>;
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
			let result: any;

			try {
				result = getMultipleLevelColumnName({
					entity: TestEntity,
					entityManager: connection.entityManager,
					originalColumnsNames: ["subEntity", "field"],
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toBe("SUB_ENTITY.FIELD");
		});

		it("should convert columns with multilevel and array sub-column", () => {
			let result: any;

			try {
				result = getMultipleLevelColumnName({
					entity: TestEntity,
					entityManager: connection.entityManager,
					originalColumnsNames: ["subEntity", "anotherField"],
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toBe("SUB_ENTITY.ANOTHER_FIELD[]");
		});

		it("should throw error if invalid column", () => {
			let result: any;

			try {
				result = getMultipleLevelColumnName({
					entity: TestEntity,
					entityManager: connection.entityManager,
					originalColumnsNames: ["subEntities", "field"],
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof ThothError).toBeTruthy();
			expect(result.message).toBe("Invalid column");
			expect(result.code).toBe("INVALID_PARAM");
			expect(result.origin).toBe("THOTHOM");
			expect(result.details).toStrictEqual([
				"Invalid column: subEntities",
				"Value received: subEntities.field",
			]);
		});
	});
});
