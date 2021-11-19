/* eslint-disable @typescript-eslint/naming-convention */

import { Column } from "../../../../lib/decorators/columns/column";
import { PrimaryColumn } from "../../../../lib/decorators/columns/primary-column";
import { Entity } from "../../../../lib/decorators/entities/entity";
import { OneToMany } from "../../../../lib/decorators/relations/one-to-many";
import { OneToOne } from "../../../../lib/decorators/relations/one-to-one";
import { DatabaseEvents } from "../../../../lib/entity-manager/types/database-events";
import { beforeFormatDataArray } from "../../../../lib/repository/methods/@helpers/before-format-data-array";
import { formatRelations } from "../../../../lib/repository/methods/@helpers/format-relations";
import { SingleSaveData } from "../../../../lib/repository/types/save-conditions";
import { TestConnection } from "../../../constants/test-connection";

describe("Repository > Methods > helpers > formatRelations", () => {
	const id = "771c819c-925f-41e4-8969-8c90988e35ec";

	describe("Single sub-entity", () => {
		@Entity()
		class SubTestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public testId: string;

			@Column({
				defaultValue: "FAKE-DATE",
			})
			public createdAt: string;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@OneToOne({
				relationMap: {
					columnName: "id",
					targetColumnName: "testId",
					foreignKeyEntity: "target",
				},
			})
			public subTest: SubTestEntity;
		}

		let connection: TestConnection;

		beforeAll(async () => {
			connection = new TestConnection({
				entities: [TestEntity, SubTestEntity],
				namingStrategy: {
					column: "UPPER_CASE",
				},
			});
			await connection.load();
		});

		it("should do everything ok", () => {
			let result: any;

			const subId = "89a78513-b6fe-477e-917c-7b86f8268a05";

			try {
				const rawData: SingleSaveData<TestEntity> = {
					id,
					subTest: {
						id: subId,
					},
				};

				const entityManager = connection.entityManager;
				const autoGenerateEvents: Array<DatabaseEvents> = ["insert"];

				const data = beforeFormatDataArray({
					data: [rawData],
					entity: TestEntity,
					entityManager,
					autoGenerateEvents,
				});

				result = formatRelations({
					entity: TestEntity,
					rawData: [rawData],
					data,
					autoGenerateEvents,
					entityManager,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([
				[
					{
						entity: SubTestEntity,
						data: {
							CREATED_AT: "FAKE-DATE",
							ID: subId,
							TEST_ID: id,
						},
					},
				],
			]);
		});

		it("should do everything ok (without relation)", () => {
			let result: any;

			try {
				const rawData: SingleSaveData<TestEntity> = {
					id,
				};

				const entityManager = connection.entityManager;
				const autoGenerateEvents: Array<DatabaseEvents> = ["insert"];

				const data = beforeFormatDataArray({
					data: [rawData],
					entity: TestEntity,
					entityManager,
					autoGenerateEvents,
				});

				result = formatRelations({
					entity: TestEntity,
					rawData: [rawData],
					data,
					autoGenerateEvents,
					entityManager,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([]);
		});
	});

	describe("Multiple sub-entities that have sub-sub-entity", () => {
		@Entity()
		class SubSubTestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public subTestId: string;

			@Column()
			public bar: number;

			@Column({
				defaultValue: "FAKE-DATE",
			})
			public createdAt: string;
		}

		@Entity()
		class SubTestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public testId: string;

			@Column({
				defaultValue: "FAKE-DATE",
			})
			public createdAt: string;

			@OneToOne({
				relationMap: {
					columnName: "id",
					targetColumnName: "subTestId",
					foreignKeyEntity: "target",
				},
			})
			public foo: SubSubTestEntity;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@OneToMany({
				targetEntity: SubTestEntity,
				relationMap: {
					columnName: "id",
					targetColumnName: "testId",
				},
			})
			public subTest: Array<SubTestEntity>;
		}

		let connection: TestConnection;

		beforeAll(async () => {
			connection = new TestConnection({
				entities: [TestEntity, SubTestEntity, SubSubTestEntity],
				namingStrategy: {
					column: "UPPER_CASE",
				},
			});
			await connection.load();
		});

		it("should do everything ok", () => {
			let result: any;

			const subId1 = "89a78513-b6fe-477e-917c-7b86f8268a05";
			const subId2 = "c2b5cc1c-227d-4e97-8701-c824d8cbf47f";
			const subSubId1 = "68183e1f-5acd-4614-8ad2-076626b79de3";
			const subSubId2 = "e20397b1-bce4-4e69-bbb1-3d6c55b47d78";

			try {
				const rawData: SingleSaveData<TestEntity> = {
					id,
					subTest: [
						{
							id: subId1,
							foo: {
								id: subSubId1,
								bar: 1,
							},
						},
						{
							id: subId2,
							foo: {
								id: subSubId2,
								bar: 2,
							},
						},
					],
				};

				const entityManager = connection.entityManager;
				const autoGenerateEvents: Array<DatabaseEvents> = ["insert"];

				const data = beforeFormatDataArray({
					data: [rawData],
					entity: TestEntity,
					entityManager,
					autoGenerateEvents,
				});

				result = formatRelations({
					entity: TestEntity,
					rawData: [rawData],
					data,
					autoGenerateEvents,
					entityManager,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([
				[
					{
						entity: SubTestEntity,
						data: {
							CREATED_AT: "FAKE-DATE",
							ID: subId1,
							TEST_ID: id,
						},
						relations: [
							{
								entity: SubSubTestEntity,
								data: {
									BAR: 1,
									CREATED_AT: "FAKE-DATE",
									ID: subSubId1,
									SUB_TEST_ID: subId1,
								},
							},
						],
					},
					{
						entity: SubTestEntity,
						data: {
							CREATED_AT: "FAKE-DATE",
							ID: subId2,
							TEST_ID: id,
						},
						relations: [
							{
								entity: SubSubTestEntity,
								data: {
									BAR: 2,
									CREATED_AT: "FAKE-DATE",
									ID: subSubId2,
									SUB_TEST_ID: subId2,
								},
							},
						],
					},
				],
			]);
		});
	});
});
