import { SymbiosisError, SymbiosisErrorCodeEnum } from "../../..";
import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entity";
import { getMultipleLevelColumnName } from "../../../lib/utils/convert/get-multiple-level-column-name";
import { TestConnection } from "../../constants/test-connection";

const createConnection = (entities: Array<any>) =>
	new TestConnection({
		entities,
		namingStrategy: {
			column: "UPPER_CASE",
		},
	});

describe("getMultipleLevelColumnName", () => {
	describe("With entity with sub-entity", () => {
		let connection: TestConnection;

		@Entity({
			isSubEntity: true,
		})
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

		beforeAll(() => {
			connection = createConnection([TestEntity]);
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

			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result.message).toBe("Invalid column");
			expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM);
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual([
				"Invalid column: subEntities",
				"Value received: subEntities.field",
			]);
		});
	});
});
