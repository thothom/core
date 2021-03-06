/* eslint-disable sonarjs/no-duplicate-string */

import { validate } from "uuid";
import { getTypeof } from "@techmmunity/utils";
import { Column } from "../../../lib/decorators/columns/column";
import { DeleteDateColumn } from "../../../lib/decorators/columns/delete-date-column";
import { InsertDateColumn } from "../../../lib/decorators/columns/insert-date-column";
import { UpdateDateColumn } from "../../../lib/decorators/columns/update-date-column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { PrimaryColumn } from "../../../lib/decorators/columns/primary-column";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/columns/primary-generated-column";
import { TestConnection } from "../../constants/test-connection";
import { Remove } from "../../../lib/repository/operators/save/remove";
import { IsNull } from "../../../lib/repository/operators/find/is-null";
import { SubEntity } from "../../../lib/decorators/entities/sub-entity";

const createConnection = async (entities: Array<any>) => {
	const connection = new TestConnection({
		entities,
	});
	await connection.load();

	return connection;
};

describe("EntityMetadata > autoGenerateEntityToDatabase", () => {
	describe("Auto generate columns of Entity", () => {
		@Entity()
		class TestEntity {
			@PrimaryGeneratedColumn()
			public id: string;

			@Column()
			public test: string;
		}

		let connection: TestConnection;

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should generate fields", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						test: "foo",
					},
				});

			expect(result).toHaveProperty("id");
			expect(result).toHaveProperty("test");
			expect(typeof result.id === "string").toBeTruthy();
			expect(validate(result.id)).toBeTruthy();
			expect(result).toStrictEqual({
				id: result.id,
				test: "foo",
			});
		});

		it("should NOT generate fields that have been already specified", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "NOT_AUTO_GENERATED",
						test: "foo",
					},
				});

			expect(result).toStrictEqual({
				id: "NOT_AUTO_GENERATED",
				test: "foo",
			});
		});

		it("should maintain the value if is a SaveOperator", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "NOT_AUTO_GENERATED",
						test: Remove(),
					},
				});

			expect(result).toStrictEqual({
				id: "NOT_AUTO_GENERATED",
				test: Remove(),
			});
		});

		it("should remove the value if is a FindOperator", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "NOT_AUTO_GENERATED",
						test: IsNull() as any,
					},
				});

			expect(result).toStrictEqual({
				id: "NOT_AUTO_GENERATED",
			});
		});

		it("should return undefined if receive undefined", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: undefined as any,
				});

			expect(result).toBeUndefined();
		});
	});

	describe("Auto generate columns of SubEntity (simple)", () => {
		@SubEntity()
		class TestSubEntity {
			@PrimaryGeneratedColumn()
			public id: string;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public testSub: TestSubEntity;
		}

		let connection: TestConnection;

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should generate fields if parent field is specified", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "abc",
						testSub: {},
					},
				});

			expect(result).toHaveProperty("testSub");
			expect(result.testSub).toHaveProperty("id");
			expect(typeof result.testSub.id === "string").toBeTruthy();
			expect(validate(result.testSub.id)).toBeTruthy();
			expect(result).toStrictEqual({
				id: "abc",
				testSub: {
					id: result.testSub.id,
				},
			});
		});

		it("should NOT generate fields if parent field is not specified", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "abc",
					},
				});

			expect(result).toStrictEqual({
				id: "abc",
			});
		});

		it("should NOT generate fields if parent field is undefined", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "abc",
						testSub: undefined,
					},
				});

			expect(result).toStrictEqual({
				id: "abc",
			});
		});

		it("should NOT generate fields if parent field is null", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "abc",
						testSub: null as any,
					},
				});

			expect(result).toStrictEqual({
				id: "abc",
			});
		});
	});

	describe("Auto generate columns of SubEntity (array of sub-entities)", () => {
		@SubEntity()
		class TestSubEntity {
			@PrimaryGeneratedColumn()
			public id: string;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column(TestSubEntity)
			public testSub: Array<TestSubEntity>;
		}

		let connection: TestConnection;

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should NOT generate anything if is empty array", () => {
			let result: any;

			try {
				result =
					connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
						entity: TestEntity,
						events: ["insert"],
						data: {
							testSub: [],
						},
					});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				testSub: [],
			});
		});

		it("should generate columns if has at least one item", () => {
			let result: any;

			try {
				result =
					connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
						entity: TestEntity,
						events: ["insert"],
						data: {
							testSub: [{}],
						},
					});
			} catch (err: any) {
				result = err;
			}

			expect(result).toHaveProperty("testSub");
			expect(Array.isArray(result.testSub)).toBeTruthy();
			expect(result.testSub).toHaveLength(1);
			expect(result.testSub[0]).toHaveProperty("id");
			expect(getTypeof(result.testSub[0].id)).toBe("string");
			expect(validate(result.testSub[0].id)).toBeTruthy();
		});
	});

	describe("NOT auto generate columns of SubEntity", () => {
		it("should NOT generate empty objects if sub-entity doesn't has any auto-generated field", async () => {
			let result: any;

			try {
				@SubEntity()
				class TestSubEntity {
					@PrimaryColumn()
					public id: string;
				}

				@Entity()
				class TestEntity {
					@PrimaryColumn()
					public id: string;

					@Column()
					public testSub: TestSubEntity;
				}

				const connection = await createConnection([TestEntity]);

				result =
					connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
						entity: TestEntity,
						events: ["insert"],
						data: {
							id: "abc",
						},
					});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				id: "abc",
			});
		});

		it("should keep empty objects if sub-entity doesn't has any auto-generated field and an empty object is specified", async () => {
			@SubEntity()
			class TestSubEntity {
				@Column()
				public id: string;
			}

			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column()
				public testSub: TestSubEntity;
			}

			const connection = await createConnection([TestEntity]);

			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "abc",
						testSub: {},
					},
				});

			expect(result).toStrictEqual({
				id: "abc",
				testSub: {},
			});
		});

		it("should remove undefined fields", async () => {
			@SubEntity()
			class TestSubEntity {
				@Column()
				public id: string;
			}

			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column()
				public testSub: TestSubEntity;
			}

			const connection = await createConnection([TestEntity]);

			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "abc",
						testSub: undefined,
					},
				});

			expect(result).toStrictEqual({
				id: "abc",
			});
		});

		it("should remove null fields", async () => {
			@SubEntity()
			class TestSubEntity {
				@Column()
				public id: string;
			}

			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column()
				public testSub: TestSubEntity;
			}

			const connection = await createConnection([TestEntity]);

			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "abc",
						testSub: null as any,
					},
				});

			expect(result).toStrictEqual({
				id: "abc",
			});
		});
	});

	describe("Auto generate columns of SubSubEntity", () => {
		@SubEntity()
		class TestSubSubEntity {
			@PrimaryGeneratedColumn()
			public id: string;
		}

		@SubEntity()
		class TestSubEntity {
			@Column()
			public foo: string;

			@Column()
			public subSubEntity: TestSubSubEntity;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public testSub: TestSubEntity;
		}

		let connection: TestConnection;

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should generate fields of sub-sub-entity if empty object is passed", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "abc",
						testSub: {
							foo: "bar",
							subSubEntity: {},
						},
					},
				});

			expect(result.testSub.subSubEntity).toHaveProperty("id");
			expect(typeof result.testSub.subSubEntity.id === "string").toBeTruthy();
			expect(validate(result.testSub.subSubEntity.id)).toBeTruthy();
			expect(result).toStrictEqual({
				id: "abc",
				testSub: {
					foo: "bar",
					subSubEntity: {
						id: result.testSub.subSubEntity.id,
					},
				},
			});
		});

		it("should NOT generate columns of sub-sub-entity if sub-entity isn't specified or doesn't has any auto-genetared columns", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "abc",
					},
				});

			expect(result.testSub).toBeUndefined();
			expect(result.testSub?.subSubEntity).toBeUndefined();
			expect(result.testSub?.subSubEntity?.id).toBeUndefined();
			expect(result).toStrictEqual({
				id: "abc",
			});
		});
	});

	describe("Only Generate columns If Events Match (save)", () => {
		@Entity()
		class TestEntity {
			@Column()
			public id: string;

			@InsertDateColumn()
			public test: string;
		}

		let connection: TestConnection;

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should generate field", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "foo",
					},
				});

			expect(result).toHaveProperty("id");
			expect(result).toHaveProperty("test");
			expect(typeof result.test === "string").toBeTruthy();
			expect(result).toStrictEqual({
				id: "foo",
				test: result.test,
			});
		});

		it("should NOT generate field", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["update"],
					data: {
						id: "foo",
					},
				});

			expect(result).toStrictEqual({
				id: "foo",
			});
		});
	});

	describe("Only Generate columns If Events Match (update)", () => {
		@Entity()
		class TestEntity {
			@Column()
			public id: string;

			@UpdateDateColumn()
			public test: string;
		}

		let connection: TestConnection;

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should generate field", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["update"],
					data: {
						id: "foo",
					},
				});

			expect(result).toHaveProperty("id");
			expect(result).toHaveProperty("test");
			expect(typeof result.test === "string").toBeTruthy();
			expect(result).toStrictEqual({
				id: "foo",
				test: result.test,
			});
		});

		it("should NOT generate field", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["delete"],
					data: {
						id: "foo",
					},
				});

			expect(result).toStrictEqual({
				id: "foo",
			});
		});
	});

	describe("Only Generate columns If Events Match (delete)", () => {
		@Entity()
		class TestEntity {
			@Column()
			public id: string;

			@DeleteDateColumn()
			public test: string;
		}

		let connection: TestConnection;

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should generate field", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["delete"],
					data: {
						id: "foo",
					},
				});

			expect(result).toHaveProperty("id");
			expect(result).toHaveProperty("test");
			expect(typeof result.test === "string").toBeTruthy();
			expect(result).toStrictEqual({
				id: "foo",
				test: result.test,
			});
		});

		it("should NOT generate field", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["insert"],
					data: {
						id: "foo",
					},
				});

			expect(result).toStrictEqual({
				id: "foo",
			});
		});
	});

	describe("Auto generate columns with default value", () => {
		it("should generate default column value (simple value)", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					defaultValue: "foo",
				})
				public test?: string;
			}

			const connection = await createConnection([TestEntity]);

			const result = connection.entityManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
				events: ["insert"],
				data: {
					id: "Test",
				},
			});

			expect(result).toStrictEqual({
				id: "Test",
				test: "foo",
			});
		});

		it("should generate default column value (function)", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					defaultValue: () => "foo",
				})
				public test?: string;
			}

			const connection = await createConnection([TestEntity]);

			const result = connection.entityManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
				events: ["insert"],
				data: {
					id: "Test",
				},
			});

			expect(result).toStrictEqual({
				id: "Test",
				test: "foo",
			});
		});
	});
});
