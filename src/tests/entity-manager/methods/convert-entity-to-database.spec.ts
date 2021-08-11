/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */

import { Column } from "../../../lib/decorators/column";
import { Entity } from "../../../lib/decorators/entity/entity";
import { PrimaryColumn } from "../../../lib/decorators/primary-column";
import { TestConnection } from "../../constants/test-connection";

const createConnection = (entities: Array<any>) =>
	new TestConnection({
		entities,
		prefix: {
			column: {
				add: "test_",
			},
		},
		suffix: {
			entity: {
				remove: "Entity",
			},
		},
	});

describe("EntityManager > convertEntityToDatabase", () => {
	describe("Simple Entity", () => {
		let connection: TestConnection;

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public test?: string;
		}

		beforeAll(() => {
			connection = createConnection([TestEntity]);
		});

		it("should convert partial data correctly", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
			});
		});

		it("should convert complete data correctly", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					test: "SuperTest",
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_test: "SuperTest",
			});
		});

		it("should filter null values", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					test: null,
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
			});
		});

		it("should filter undefined values", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					test: undefined,
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
			});
		});

		it("should return an empty object if no data is passed", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: undefined as any,
			});

			expect(result).toStrictEqual({});
		});
	});

	describe("Simple Entity With Custom Column Names", () => {
		it("should not format name if it is passed on primary-column param", () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn("CUSTOM_FIELD_NAME")
				public id: string;

				@Column()
				public test: string;
			}

			const connection = createConnection([TestEntity]);

			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					test: "foo",
				},
			});

			expect(result).toStrictEqual({
				CUSTOM_FIELD_NAME: "Test",
				test_test: "foo",
			});
		});

		it("should not format name if it is passed on primary-column options", () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn({
					name: "CUSTOM_FIELD_NAME",
				})
				public id: string;

				@Column()
				public test: string;
			}

			const connection = createConnection([TestEntity]);

			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					test: "foo",
				},
			});

			expect(result).toStrictEqual({
				CUSTOM_FIELD_NAME: "Test",
				test_test: "foo",
			});
		});

		it("should not format the name if it is passed on column options", () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					name: "CUSTOM_FIELD_NAME",
				})
				public test: string;
			}

			const connection = createConnection([TestEntity]);

			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					test: "foo",
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				CUSTOM_FIELD_NAME: "foo",
			});
		});
	});

	describe("Entity With Array", () => {
		let connection: TestConnection;

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column(String)
			public test?: Array<string>;
		}

		beforeAll(() => {
			connection = createConnection([TestEntity]);
		});

		it("should convert complete data correctly", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					test: ["SuperTest"],
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_test: ["SuperTest"],
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
			@PrimaryColumn()
			public id: string;

			@Column()
			public subEntity: SubTestEntity;
		}

		beforeAll(() => {
			connection = createConnection([TestEntity]);
		});

		it("should convert partial data of sub-entity correctly", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					subEntity: {
						anotherField: 1,
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					anotherField: 1,
				},
			});
		});

		it("should convert complete data correctly", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					subEntity: {
						field: "foo",
						anotherField: 1,
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					field: "foo",
					anotherField: 1,
				},
			});
		});

		it("should filter null values", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					subEntity: null,
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
			});
		});

		it("should filter undefined values", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					subEntity: undefined,
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
			});
		});
	});

	describe("Entity With Array of SubEntities", () => {
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
			@PrimaryColumn()
			public id: string;

			@Column(SubTestEntity)
			public subEntities: Array<SubTestEntity>;
		}

		beforeAll(() => {
			connection = createConnection([TestEntity]);
		});

		it("should convert partial data of sub-entity correctly", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					subEntities: [
						{
							anotherField: 1,
						},
					],
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntities: [
					{
						anotherField: 1,
					},
				],
			});
		});

		it("should convert complete data correctly", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					subEntities: [
						{
							field: "foo",
							anotherField: 1,
						},
						{
							field: "bar",
							anotherField: 2,
						},
					],
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntities: [
					{
						field: "foo",
						anotherField: 1,
					},
					{
						field: "bar",
						anotherField: 2,
					},
				],
			});
		});
	});

	describe("Entity With SubEntity + SubSubEntity", () => {
		let connection: TestConnection;

		@Entity({
			isSubEntity: true,
		})
		class SubSubTestEntity {
			@Column()
			public subField: string;

			@Column()
			public subFieldTwo: number;
		}

		@Entity({
			isSubEntity: true,
		})
		class SubTestEntity {
			@Column()
			public field?: string;

			@Column()
			public subSubEntity: SubSubTestEntity;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public subEntity: SubTestEntity;
		}

		beforeAll(() => {
			connection = createConnection([TestEntity]);
		});

		it("should convert partial data of sub-sub-entity correctly", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					subEntity: {
						field: "1",
						subSubEntity: {
							subField: "foo",
						},
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					field: "1",
					subSubEntity: {
						subField: "foo",
					},
				},
			});
		});

		it("should convert complete data correctly", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					subEntity: {
						field: "1",
						subSubEntity: {
							subField: "foo",
							subFieldTwo: 1,
						},
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					field: "1",
					subSubEntity: {
						subField: "foo",
						subFieldTwo: 1,
					},
				},
			});
		});
	});

	describe("Entity With SubEntity + Array of SubSubEntities", () => {
		let connection: TestConnection;

		@Entity({
			isSubEntity: true,
		})
		class SubSubTestEntity {
			@Column()
			public subField: string;

			@Column()
			public subFieldTwo: number;
		}

		@Entity({
			isSubEntity: true,
		})
		class SubTestEntity {
			@Column()
			public field?: string;

			@Column(SubSubTestEntity)
			public subSubEntity: Array<SubSubTestEntity>;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public subEntity: SubTestEntity;
		}

		beforeAll(() => {
			connection = createConnection([TestEntity]);
		});

		it("should convert partial data of sub-sub-entity correctly", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					subEntity: {
						field: "1",
						subSubEntity: [
							{
								subField: "foo",
							},
						],
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					field: "1",
					subSubEntity: [
						{
							subField: "foo",
						},
					],
				},
			});
		});

		it("should convert complete data correctly", () => {
			const result = connection.metadataManager.convertEntityToDatabase({
				entity: TestEntity,
				data: {
					id: "Test",
					subEntity: {
						field: "1",
						subSubEntity: [
							{
								subField: "foo",
								subFieldTwo: 1,
							},
							{
								subField: "bar",
								subFieldTwo: 2,
							},
						],
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					field: "1",
					subSubEntity: [
						{
							subField: "foo",
							subFieldTwo: 1,
						},
						{
							subField: "bar",
							subFieldTwo: 2,
						},
					],
				},
			});
		});
	});
});
