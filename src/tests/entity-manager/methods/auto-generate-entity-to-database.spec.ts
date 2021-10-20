/* eslint-disable sonarjs/no-duplicate-string */

import { validate } from "uuid";
import { getTypeof } from "@techmmunity/utils";
import { Column } from "../../../lib/decorators/columns/column";
import { DeleteDateColumn } from "../../../lib/decorators/columns/delete-date-column";
import { SaveDateColumn } from "../../../lib/decorators/columns/save-date-column";
import { UpdateDateColumn } from "../../../lib/decorators/columns/update-date-column";
import { Entity } from "../../../lib/decorators/entity";
import { PrimaryColumn } from "../../../lib/decorators/columns/primary-column";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/columns/primary-generated-column";
import { TestConnection } from "../../constants/test-connection";

const createConnection = (entities: Array<any>) =>
	new TestConnection({
		entities,
	});

describe("EntityMetadata > autoGenerateEntityToDatabase", () => {
	describe("Auto Generate Fields of Entity", () => {
		@Entity()
		class TestEntity {
			@PrimaryGeneratedColumn()
			public id: string;

			@Column()
			public test: string;
		}

		const connection = createConnection([TestEntity]);

		it("should generate fields", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["save"],
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

		it("should return undefined if receive undefined", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["save"],
					data: undefined as any,
				});

			expect(result).toBeUndefined();
		});
	});

	describe("Auto Generate Fields of SubEntity (simple)", () => {
		@Entity({
			isSubEntity: true,
		})
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

		const connection = createConnection([TestEntity]);

		it("should generate fields if parent field is specified", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["save"],
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
					events: ["save"],
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
					events: ["save"],
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
					events: ["save"],
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

	describe("Auto Generate Fields of SubEntity (array of sub-entities)", () => {
		@Entity({
			isSubEntity: true,
		})
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

		const connection = createConnection([TestEntity]);

		it("should NOT generate anything if is empty array", () => {
			let result: any;

			try {
				result =
					connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
						entity: TestEntity,
						events: ["save"],
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
						events: ["save"],
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

	describe("NOT Auto Generate Fields of SubEntity", () => {
		it("should NOT generate empty objects if sub-entity doesn't has any auto-generated field", () => {
			let result: any;

			try {
				@Entity({
					isSubEntity: true,
				})
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

				const connection = createConnection([TestEntity]);

				result =
					connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
						entity: TestEntity,
						events: ["save"],
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

		it("should keep empty objects if sub-entity doesn't has any auto-generated field and an empty object is specified", () => {
			@Entity({
				isSubEntity: true,
			})
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

			const connection = createConnection([TestEntity]);

			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["save"],
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

		it("should remove undefined fields", () => {
			@Entity({
				isSubEntity: true,
			})
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

			const connection = createConnection([TestEntity]);

			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["save"],
					data: {
						id: "abc",
						testSub: undefined,
					},
				});

			expect(result).toStrictEqual({
				id: "abc",
			});
		});

		it("should remove null fields", () => {
			@Entity({
				isSubEntity: true,
			})
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

			const connection = createConnection([TestEntity]);

			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["save"],
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

	describe("Auto Generate Fields of SubSubEntity", () => {
		@Entity({ isSubEntity: true })
		class TestSubSubEntity {
			@PrimaryGeneratedColumn()
			public id: string;
		}

		@Entity({ isSubEntity: true })
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

		const connection = createConnection([TestEntity]);

		it("should generate fields of sub-sub-entity if empty object is passed", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["save"],
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
					events: ["save"],
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

	describe("Only Generate Fields If Events Match (save)", () => {
		@Entity()
		class TestEntity {
			@Column()
			public id: string;

			@SaveDateColumn()
			public test: string;
		}

		const connection = createConnection([TestEntity]);

		it("should generate field", () => {
			const result =
				connection.entityManager.autoGenerateEntityToDatabase<TestEntity>({
					entity: TestEntity,
					events: ["save"],
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

	describe("Only Generate Fields If Events Match (update)", () => {
		@Entity()
		class TestEntity {
			@Column()
			public id: string;

			@UpdateDateColumn()
			public test: string;
		}

		const connection = createConnection([TestEntity]);

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

	describe("Only Generate Fields If Events Match (delete)", () => {
		@Entity()
		class TestEntity {
			@Column()
			public id: string;

			@DeleteDateColumn()
			public test: string;
		}

		const connection = createConnection([TestEntity]);

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
					events: ["save"],
					data: {
						id: "foo",
					},
				});

			expect(result).toStrictEqual({
				id: "foo",
			});
		});
	});

	/**
	 * Implement this after auto-generate fields FROM DATABASE are implemented
	 */
	it.todo(
		"should	NOT generate fields if auto-generation type is DATABASE_TO_CODE",
	);
});
