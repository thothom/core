import { Column } from "../../../lib/decorators/columns/column";
import { PrimaryColumn } from "../../../lib/decorators/columns/primary-column";
import { Entity } from "../../../lib/decorators/entity";
import { setGlobalConnection } from "../../../lib/utils/globals/set-global-connection";
import { TestConnection } from "../../constants/test-connection";

describe("Utils > setGlobalConnection", () => {
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

	afterEach(() => {
		delete global.symbiosisConnections;
	});

	it("should define connection globally", () => {
		let result;

		try {
			result = setGlobalConnection(connection);
		} catch (err: any) {
			result = err;
		}

		expect(result).toBeUndefined();
	});

	it("should define connection globally if already has a connection", () => {
		let result;

		try {
			const connection1 = new TestConnection({
				name: "Custom",
				entities: [TestEntity],
				logging: "MINIMUM",
			});

			setGlobalConnection(connection);
			result = setGlobalConnection(connection1);
		} catch (err: any) {
			result = err;
		}

		expect(result).toBeUndefined();
	});
});
