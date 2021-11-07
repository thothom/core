import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { getColumnDatabaseName } from "../../../lib/utils/convert/get-column-database-name";
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

describe("getColumnDatabaseName", () => {
	describe("With simple entity", () => {
		let connection: TestConnection;

		@Entity()
		class TestEntity {
			@Column()
			public id: string;

			@Column()
			public stringColumn: string;

			@Column(String)
			public arrayColumn: Array<string>;
		}

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should convert column", () => {
			let result: any;

			try {
				result = getColumnDatabaseName({
					entity: TestEntity,
					entityManager: connection.entityManager,
					columnName: "stringColumn",
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toBe("STRING_COLUMN");
		});

		it("should convert array column", () => {
			let result: any;

			try {
				result = getColumnDatabaseName({
					entity: TestEntity,
					entityManager: connection.entityManager,
					columnName: "arrayColumn[]",
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toBe("ARRAY_COLUMN[]");
		});

		it("should convert array column and add []", () => {
			let result: any;

			try {
				result = getColumnDatabaseName({
					entity: TestEntity,
					entityManager: connection.entityManager,
					columnName: "arrayColumn",
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toBe("ARRAY_COLUMN[]");
		});
	});
});
