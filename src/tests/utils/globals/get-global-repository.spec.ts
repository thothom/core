import { Column } from "../../../lib/decorators/columns/column";
import { PrimaryColumn } from "../../../lib/decorators/columns/primary-column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { ThothError } from "../../../lib/error";
import { getGlobalRepository } from "../../../lib/utils/globals/get-global-repository";
import { setGlobalConnection } from "../../../lib/utils/globals/set-global-connection";
import { TestConnection } from "../../constants/test-connection";
import { TestRepository } from "../../constants/test-repository";

describe("Utils > getGlobalRepository", () => {
	afterEach(() => {
		delete global.thothConnections;
	});

	it("should get global repository of default connection", async () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;
		}

		const connection = new TestConnection({
			entities: [TestEntity],
			logging: "MINIMUM",
		});
		await connection.load();

		let result;

		try {
			setGlobalConnection(connection);

			result = getGlobalRepository(TestEntity);
		} catch (err: any) {
			result = err;
		}

		expect(result instanceof TestRepository).toBeTruthy();
	});

	it("should get global repository of connection with custom name", async () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;
		}

		const connection = new TestConnection({
			name: "Custom",
			entities: [TestEntity],
			logging: "MINIMUM",
		});
		await connection.load();

		let result;

		try {
			setGlobalConnection(connection);

			result = getGlobalRepository(TestEntity, "Custom");
		} catch (err: any) {
			result = err;
		}

		expect(result instanceof TestRepository).toBeTruthy();
	});

	it("should throw error if repository is not defined", async () => {
		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public foo: number;
		}

		const connection = new TestConnection({
			entities: [],
			logging: "MINIMUM",
		});
		await connection.load();

		let result;

		try {
			setGlobalConnection(connection);

			result = getGlobalRepository(TestEntity);
		} catch (err: any) {
			result = err;
		}

		expect(result instanceof ThothError).toBeTruthy();
	});
});
