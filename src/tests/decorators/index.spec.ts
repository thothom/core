import { Column } from "../../lib/decorators/columns/column";
import { Entity } from "../../lib/decorators/entities/entity";
import { Index } from "../../lib/decorators/index";
import { MetadataUtil } from "../../lib/utils/metadata-util";

describe("Decorators > Index", () => {
	describe("No Parameters", () => {
		it("should define index", () => {
			@Entity()
			class Test {
				@Index()
				@Column()
				public foo: string;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Test,
			});

			expect(metadata).toStrictEqual({
				name: "Test",
				databaseName: "Test",
				indexes: [
					{
						databaseName: "foo_index",
						columns: [
							{
								name: "foo",
								extras: undefined,
							},
						],
					},
				],
				columns: [
					{
						databaseName: "foo",
						name: "foo",
						type: String,
					},
				],
			});
		});
	});

	describe("Name Parameter", () => {
		it("should define index with name", () => {
			@Entity()
			class Test {
				@Index("test_index")
				@Column()
				public foo: string;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Test,
			});

			expect(metadata).toStrictEqual({
				name: "Test",
				databaseName: "Test",
				indexes: [
					{
						databaseName: "test_index",
						columns: [
							{
								name: "foo",
								extras: undefined,
							},
						],
					},
				],
				columns: [
					{
						databaseName: "foo",
						name: "foo",
						type: String,
					},
				],
			});
		});
	});

	describe("Options Parameter", () => {
		it("should define name based on options", () => {
			@Entity()
			class Test {
				@Index({
					name: "test_index",
				})
				@Column()
				public foo: string;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Test,
			});

			expect(metadata).toStrictEqual({
				name: "Test",
				databaseName: "Test",
				indexes: [
					{
						databaseName: "test_index",
						columns: [
							{
								name: "foo",
								extras: undefined,
							},
						],
					},
				],
				columns: [
					{
						databaseName: "foo",
						name: "foo",
						type: String,
					},
				],
			});
		});
	});

	describe("Composite indexes", () => {
		it("should define multiple columns for the same index", () => {
			@Entity()
			class Test {
				@Index("composite_index")
				@Column()
				public foo: string;

				@Index("composite_index")
				@Column()
				public bar: string;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Test,
			});

			expect(metadata).toStrictEqual({
				name: "Test",
				databaseName: "Test",
				indexes: [
					{
						databaseName: "composite_index",
						columns: [
							{
								name: "foo",
								extras: undefined,
							},
							{
								name: "bar",
								extras: undefined,
							},
						],
					},
				],
				columns: [
					{
						databaseName: "foo",
						name: "foo",
						type: String,
					},
					{
						databaseName: "bar",
						name: "bar",
						type: String,
					},
				],
			});
		});
	});

	describe("Multiple indexes", () => {
		it("should define multiple indexes", () => {
			@Entity()
			class Test {
				@Index()
				@Column()
				public foo: string;

				@Index()
				@Column()
				public bar: string;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Test,
			});

			expect(metadata).toStrictEqual({
				name: "Test",
				databaseName: "Test",
				indexes: [
					{
						databaseName: "foo_index",
						columns: [
							{
								name: "foo",
								extras: undefined,
							},
						],
					},
					{
						databaseName: "bar_index",
						columns: [
							{
								name: "bar",
								extras: undefined,
							},
						],
					},
				],
				columns: [
					{
						databaseName: "foo",
						name: "foo",
						type: String,
					},
					{
						databaseName: "bar",
						name: "bar",
						type: String,
					},
				],
			});
		});
	});
});
