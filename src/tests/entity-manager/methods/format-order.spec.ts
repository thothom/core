/* eslint-disable sonarjs/no-duplicate-string */

import {
	PrimaryColumn,
	SymbiosisError,
	SymbiosisErrorCodeEnum,
} from "../../..";
import { Column } from "../../../lib/decorators/column";
import { Entity } from "../../../lib/decorators/entity/entity";
import { TestConnection } from "../../constants/test-connection";

const createConnection = (entities: Array<any>) =>
	new TestConnection({
		entities,
		namingStrategy: {
			column: "UPPER_CASE",
		},
	});

describe("EntityMetadata > formatOrder", () => {
	describe("With simple entity", () => {
		let connection: TestConnection;

		@Entity()
		class TestEntity {
			@Column()
			public id: string;

			@Column()
			public test: string;
		}

		beforeAll(() => {
			connection = createConnection([TestEntity]);
		});

		it("should convert columns names", () => {
			const result = connection.entityManager.formatOrder({
				entity: TestEntity,
				orderBy: {
					id: "ASC",
				},
			});

			expect(result).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ID: "ASC",
			});
		});
	});

	describe("Simple Entity With Custom Column Names", () => {
		it("should convert columns if it is passed on primary-column param", () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn("CUSTOM_FIELD_NAME")
				public id: string;

				@Column()
				public test: string;
			}

			const connection = createConnection([TestEntity]);

			const result = connection.entityManager.formatOrder({
				entity: TestEntity,
				orderBy: {
					id: "ASC",
				},
			});

			expect(result).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				CUSTOM_FIELD_NAME: "ASC",
			});
		});

		it("should convert columns if it is passed on column options", () => {
			@Entity()
			class TestEntity {
				@Column()
				public id: string;

				@Column({
					name: "CUSTOM_FIELD_NAME",
				})
				public test: string;
			}

			const connection = createConnection([TestEntity]);

			const result = connection.entityManager.formatOrder({
				entity: TestEntity,
				orderBy: {
					id: "ASC",
					test: "DESC",
				},
			});

			expect(result).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ID: "ASC",
				// eslint-disable-next-line @typescript-eslint/naming-convention
				CUSTOM_FIELD_NAME: "DESC",
			});
		});
	});

	describe("Entity With SubEntity", () => {
		let connection: TestConnection;

		@Entity({
			isSubEntity: true,
		})
		class SubTestEntity {
			@Column()
			public field?: string;

			@Column()
			public anotherField: number;
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
				result = connection.entityManager.formatOrder({
					entity: TestEntity,
					orderBy: {
						"id": "ASC",
						"subEntity.field": "DESC",
					},
				});
			} catch (err) {
				result = err;
			}

			expect(result).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				"ID": "ASC",
				// eslint-disable-next-line @typescript-eslint/naming-convention
				"SUB_ENTITY.field": "DESC",
			});
		});

		it("should throw error if columns is a subEntity and the subField isn't specified", () => {
			let result: any;

			try {
				result = connection.entityManager.formatOrder({
					entity: TestEntity,
					orderBy: {
						id: "ASC",
						subEntity: "DESC",
					},
				});
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result.message).toBe("Invalid order");
			expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM);
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual([
				'Column "subEntity" is a subEntity, and cannot be used to ordering. Use a column of this subEntity',
			]);
		});

		it("should throw error because wrong column type", () => {
			let result: any;

			try {
				result = connection.entityManager.formatOrder({
					entity: TestEntity,
					orderBy: {
						"id.field": "ASC",
						"subEntity.anotherField": "DESC",
					},
				});
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result.message).toBe("Invalid column");
			expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM);
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual([
				"Invalid column: id",
				'This column has the "String" type, and it cannot be used as an multiple level column',
				"Value received: id.field",
			]);
		});
	});

	describe("Entity With SubSubEntity", () => {
		let connection: TestConnection;

		@Entity({
			isSubEntity: true,
		})
		class SubSubTestEntity {
			@Column()
			public anotherField?: string;
		}

		@Entity({
			isSubEntity: true,
		})
		class SubTestEntity {
			@Column()
			public field?: SubSubTestEntity;
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
				result = connection.entityManager.formatOrder({
					entity: TestEntity,
					orderBy: {
						"id": "ASC",
						"subEntity.field.anotherField": "DESC",
					},
				});
			} catch (err) {
				result = err;
			}

			expect(result).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				"ID": "ASC",
				// eslint-disable-next-line @typescript-eslint/naming-convention
				"SUB_ENTITY.FIELD.anotherField": "DESC",
			});
		});
	});
});
