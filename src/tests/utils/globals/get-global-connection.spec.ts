import { Column } from "../../../lib/decorators/columns/column";
import { PrimaryColumn } from "../../../lib/decorators/columns/primary-column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { SymbiosisError } from "../../../lib/error";
import { getGlobalConnection } from "../../../lib/utils/globals/get-global-connection";
import { setGlobalConnection } from "../../../lib/utils/globals/set-global-connection";
import { TestConnection } from "../../constants/test-connection";

describe("Utils > getGlobalConnection", () => {
	afterEach(() => {
		delete global.symbiosisConnections;
	});

	it("should get global connection (default)", async () => {
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

			result = getGlobalConnection();
		} catch (err: any) {
			result = err;
		}

		expect(result).toBe(connection);
	});

	it("should get global connection (custom name)", async () => {
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

			result = getGlobalConnection("Custom");
		} catch (err: any) {
			result = err;
		}

		expect(result).toBe(connection);
	});

	it("should throw error if any global connection is not defined", () => {
		let result;

		try {
			result = getGlobalConnection();
		} catch (err: any) {
			result = err;
		}

		expect(result instanceof SymbiosisError).toBeTruthy();
	});

	it("should throw error if the specified connection is not defined globally", async () => {
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

			result = getGlobalConnection("Custom");
		} catch (err: any) {
			result = err;
		}

		expect(result instanceof SymbiosisError).toBeTruthy();
	});
});
