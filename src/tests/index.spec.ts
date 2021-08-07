import { Connection } from "../lib/connection";
import { Repository } from "../lib/connection/types/repository";
import { Column } from "../lib/decorators/column";
import { Entity } from "../lib/decorators/entity/entity";
import { PrimaryColumn } from "../lib/decorators/primary-column";

describe("Generic", () => {
	it("show work OK", () => {
		@Entity()
		class Test {
			@PrimaryColumn()
			public id: string;

			@Column()
			public test: string;
		}

		class Foo extends Connection {
			public getRepository<Entity>(_entity: Entity) {
				return {} as Repository<Entity>;
			}
		}

		// eslint-disable-next-line no-new
		new Foo({
			entities: [Test],
		});

		expect(true).toBeTruthy();
	});
});
