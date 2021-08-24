import { BaseConnectionOptions } from "../../lib/connection/types/connection-options";
import { Column } from "../../lib/decorators/column";
import { Entity } from "../../lib/decorators/entity/entity";
import { PrimaryColumn } from "../../lib/decorators/primary-column";
import { Logger } from "../../lib/logger";
import { TestConnection } from "../constants/test-connection";

describe("Connection > entity", () => {
	it("should get connection default config", () => {
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

		expect(connection.name).toStrictEqual("Default");
		expect(connection.options).toStrictEqual(options);
		expect(connection.logger instanceof Logger).toBeTruthy();
	});

	it("should get connection custom config", () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;
		}

		const options: BaseConnectionOptions = {
			name: "Custom",
			entities: [TestEntity],
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

		const connection = new TestConnection(options);

		expect(connection.name).toStrictEqual("Custom");
		expect(connection.options).toStrictEqual(options);
		expect(connection.logger instanceof Logger).toBeTruthy();
	});
});
