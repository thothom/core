import { ThothError } from "../..";
import { Column } from "../../lib/decorators/columns/column";
import { PrimaryColumn } from "../../lib/decorators/columns/primary-column";
import { Entity } from "../../lib/decorators/entities/entity";
import { Logger } from "../../lib/logger";
import { TestConnection } from "../constants/test-connection";

import type { BaseConnectionOptions } from "../../lib/connection/types/connection-options";

describe("Connection", () => {
	const plugin = "@techmmunity/utils";

	describe("Connection `constructor` & `load`", () => {
		it("should load empty array of entities", async () => {
			const options: BaseConnectionOptions = {
				entitiesDir: [],
			};

			const connection = new TestConnection(options);
			await connection.load();

			expect(connection.name).toBe("Default");
			expect(connection.options).toStrictEqual({
				plugin,
			});
			expect(connection.entities).toStrictEqual([]);
			expect(connection.options).not.toHaveProperty("entities");
			expect(connection.options).not.toHaveProperty("entitiesDir");
			expect(connection.logger instanceof Logger).toBeTruthy();
			expect(connection.entityManager.entities).toStrictEqual({});
		});

		it("should get connection default config", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column()
				public foo: number;
			}

			const options: BaseConnectionOptions = {
				entities: [TestEntity],
			};

			const connection = new TestConnection(options);
			await connection.load();

			expect(connection.name).toBe("Default");
			expect(connection.options).toStrictEqual({
				plugin,
			});
			expect(connection.entities).toStrictEqual(options.entities);
			expect(connection.options).not.toHaveProperty("entities");
			expect(connection.options).not.toHaveProperty("entitiesDir");
			expect(connection.logger instanceof Logger).toBeTruthy();
			expect(connection.entityManager.entities).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				TestEntity: {
					columns: [
						{ databaseName: "id", name: "id", primary: true, type: String },
						{ databaseName: "foo", name: "foo", type: Number },
					],
					databaseName: "TestEntity",
					name: "TestEntity",
				},
			});
		});

		it("should get connection custom config", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column()
				public foo: number;
			}

			const baseOptions: BaseConnectionOptions = {
				name: "Custom",
				namingStrategy: {
					entity: "PascalCase",
					column: "snake_case",
				},
				logging: "MINIMUM",
				prefix: {
					entity: {
						add: "add",
					},
					column: {
						remove: "remove",
					},
				},
			};

			const options = {
				...baseOptions,
				entities: [TestEntity],
			};

			const connection = new TestConnection(options);
			await connection.load();

			expect(connection.name).toBe("Custom");
			expect(connection.options).toStrictEqual({
				...baseOptions,
				plugin,
			});
			expect(connection.entities).toStrictEqual(options.entities);
			expect(connection.options).not.toHaveProperty("entities");
			expect(connection.options).not.toHaveProperty("entitiesDir");
			expect(connection.logger instanceof Logger).toBeTruthy();
			expect(connection.entityManager.entities).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/naming-convention
				TestEntity: {
					columns: [
						{ databaseName: "id", name: "id", primary: true, type: String },
						{ databaseName: "foo", name: "foo", type: Number },
					],
					databaseName: "AddTestEntity",
					name: "TestEntity",
				},
			});
		});
	});

	describe("Connection `basicValidate`", () => {
		it("should throw error load empty array of entities", async () => {
			const options: BaseConnectionOptions = {
				entitiesDir: [],
			};

			const connection = new TestConnection(options);
			await connection.load();

			let result: any;

			try {
				result = connection.testBasicValidate();
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof ThothError).toBeTruthy();
			expect(result).toStrictEqual(
				new ThothError({
					code: "MISSING_PARAM",
					origin: "THOTHOM",
					message: "Missing entities",
					details: [
						"No entities found",
						"`entities` option:",
						undefined,
						"`entitiesDir` option:",
						[],
					],
				}),
			);
		});
	});

	it.todo("the entities loading is impossible to test");
});
