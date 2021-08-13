/* eslint-disable sonarjs/no-duplicate-string */

import { validate } from "uuid";
import { Column } from "../../../lib/decorators/column";
import { DeleteDateColumn } from "../../../lib/decorators/date-columns/delete-date-column";
import { SaveDateColumn } from "../../../lib/decorators/date-columns/save-date-column";
import { UpdateDateColumn } from "../../../lib/decorators/date-columns/update-date-column";
import { Entity } from "../../../lib/decorators/entity/entity";
import { PrimaryColumn } from "../../../lib/decorators/primary-column";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/primary-generated-column";
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
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
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
	});

	describe("Auto Generate Fields of SubEntity", () => {
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

		it("should generate fields parent field is specified", () => {
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
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

		it("should generate fields parent field is not specified", () => {
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "abc",
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

		it("should generate fields parent field is undefined", () => {
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "abc",
					testSub: undefined,
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

		it("should generate fields parent field is null", () => {
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "abc",
					testSub: null,
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
	});

	describe("NOT Auto Generate Fields of SubEntity", () => {
		it("should NOT generate empty objects if sub-entity doesn't has any auto-generated field", () => {
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

			const result = connection.metadataManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "abc",
				},
			});

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

			const result = connection.metadataManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
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

		it("should keep undefined fields", () => {
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

			const result = connection.metadataManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "abc",
					testSub: undefined,
				},
			});

			expect(result).toStrictEqual({
				id: "abc",
				testSub: undefined,
			});
		});

		it("should keep null fields", () => {
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

			const result = connection.metadataManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "abc",
					testSub: null,
				},
			});

			expect(result).toStrictEqual({
				id: "abc",
				testSub: null,
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
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
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

		it("should generate fields of sub-entity and sub-sub-entity", () => {
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "abc",
				},
			});

			expect(result.testSub.subSubEntity).toHaveProperty("id");
			expect(typeof result.testSub.subSubEntity.id === "string").toBeTruthy();
			expect(validate(result.testSub.subSubEntity.id)).toBeTruthy();
			expect(result).toStrictEqual({
				id: "abc",
				testSub: {
					subSubEntity: {
						id: result.testSub.subSubEntity.id,
					},
				},
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
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
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
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
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
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
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
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
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
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
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
			const result = connection.metadataManager.autoGenerateEntityToDatabase({
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

	it.todo(
		"should	NOT generate fields if auto-generation type is DATABASE_TO_CODE",
	);
});
