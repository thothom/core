import { getTypeof } from "@techmmunity/utils";

import { formatConditions } from "..";

import type { EntityManager } from "../../..";

import { MetadataUtil } from "../../../../utils/metadata-util";
import { isFindOperator } from "../../../../utils/operators/is-find-operator";

import type { ArrayFindConditions } from "../../../../repository/types/find-conditions";
import type { DatabaseEntity } from "../../../../types/database-entity";
import type { IncrementedEntitiesMetadata } from "../../../types/manager-metadata";
import type { CustomClass } from "../../../types/metadata-type";

interface GetConditionsFormattedParams {
	conditionsArray: ArrayFindConditions<Record<string, any>>; // Normal Entity, NOT Database Entity
	entityMetadata: IncrementedEntitiesMetadata;
	entityManager: EntityManager;
}

export const getConditionsFormatted = ({
	conditionsArray,
	entityMetadata,
	entityManager,
}: GetConditionsFormattedParams) =>
	conditionsArray.map(conditions =>
		entityMetadata.columns.reduce((acc, columnMetadata) => {
			const value = conditions[columnMetadata.name];

			if (getTypeof(value) === "undefined") return acc;

			/**
			 * If it is a find operator, just change de key name
			 * and keep the current value
			 */
			if (isFindOperator(value)) {
				acc[columnMetadata.databaseName] = value;

				return acc;
			}

			if (MetadataUtil.isCustomMetadataType(columnMetadata.type)) {
				const subEntityMetadata = entityManager.getEntityMetadata(
					columnMetadata.type,
				);

				if (columnMetadata.isArray) {
					acc[columnMetadata.databaseName] = value.map((val: CustomClass) =>
						/**
						 * ALERT: Recursive call of the father function!!!
						 * ALERT: Recursive call of the father function!!!
						 * ALERT: Recursive call of the father function!!!
						 */
						formatConditions(
							{
								entityManager,
							},
							{
								entity: subEntityMetadata,
								conditions: val,
							},
						),
					);

					return acc;
				}

				/**
				 * ALERT: Recursive call of the father function!!!
				 * ALERT: Recursive call of the father function!!!
				 * ALERT: Recursive call of the father function!!!
				 */
				acc[columnMetadata.databaseName] = formatConditions(
					{
						entityManager,
					},
					{
						entity: subEntityMetadata,
						conditions: value,
					},
				);

				return acc;
			}

			/**
			 * If it is a simple value (Like 1, "foo"),
			 * just change de key name and keep the current value
			 */
			acc[columnMetadata.databaseName] = value;

			return acc;
		}, {} as DatabaseEntity),
	);
