import type { EntityManager } from "../../entity-manager";
import { ThothError } from "../../error";
import { MetadataUtil } from "../metadata-util";

import type { CustomClass } from "../../entity-manager/types/metadata-type";

interface GetMultipleLevelColumnNameParams {
	entity: CustomClass;
	entityManager: EntityManager;
	/**
	 * When the father function receives an string of multilevel columns,
	 * like "columnOne.columnTwo.columnThree", it splits the string in an
	 * array (Ex: ["columnOne", "columnTwo", "columnThree"]).
	 *
	 * This parameter is this raw value, with no modifications. It is used
	 * to throw errors with more details.
	 */
	originalColumnsNames: Array<string>;
	/**
	 * The array of columns that is handled inside the loop.
	 *
	 * The default values is the same as "originalColumnsNames",
	 * because this function handles all the entity->database conversion,
	 * and starts from the first item of "originalColumnsNames".
	 *
	 * Each time that it pass through the loop, the first it of the array
	 * is removed, so the function can be called recursively
	 *
	 * Is an internal parameter and SHOULD NOT BE USED!
	 */
	currentColumnsNames?: Array<string>;
	/**
	 * Accumulator to the database columns names
	 * Is an internal parameter and SHOULD NOT BE USED!
	 */
	acc?: Array<string>;
}

const getColumnMetadata = (
	entityManager: EntityManager,
	entity: any,
	currentColumnName: string,
	originalColumnsNames: Array<string>,
) => {
	try {
		return entityManager.getColumnMetadata(entity, currentColumnName);
	} catch (err) {
		throw new ThothError({
			message: "Invalid column",
			code: "INVALID_PARAM",
			origin: "THOTHOM",
			details: [
				`Invalid column: ${currentColumnName}`,
				`Value received: ${originalColumnsNames.join(".")}`,
			],
		});
	}
};

export const getMultipleLevelColumnName = ({
	entity,
	entityManager,
	originalColumnsNames,
	currentColumnsNames = originalColumnsNames,
	acc = [],
}: GetMultipleLevelColumnNameParams): string => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const currentColumnName = currentColumnsNames
		.slice()
		.shift()!
		.replace(/\[\]/g, "") as string;

	const columnMetadata = getColumnMetadata(
		entityManager,
		entity,
		currentColumnName,
		originalColumnsNames,
	);

	/**
	 * The "currentColumnsNames" array must have
	 *
	 * **AT LEAST 2**
	 *
	 * items, so be careful to not replace this validation
	 * and end up to breaking something
	 */
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const hasMoreLevels = currentColumnsNames.length > 1;

	const isSubEntity = MetadataUtil.isCustomMetadataType(columnMetadata.type);

	if (hasMoreLevels) {
		if (isSubEntity) {
			return getMultipleLevelColumnName({
				entityManager,
				originalColumnsNames,
				entity: columnMetadata.type,
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				currentColumnsNames: currentColumnsNames.slice(1),
				acc: [
					...acc,
					`${columnMetadata.databaseName}${columnMetadata.isArray ? "[]" : ""}`,
				],
			});
		}

		throw new ThothError({
			message: "Invalid column",
			code: "INVALID_PARAM",
			origin: "THOTHOM",
			details: [
				`Invalid column: ${currentColumnName}`,
				/**
				 * In this case, `.name` will always exist, so this rule doesn't applies
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				`This column has the "${columnMetadata.type.name}" type, and it cannot be used as an multiple level column`,
				`Value received: ${originalColumnsNames.join(".")}`,
			],
		});
	}

	/**
	 * The final stage of the loop,
	 * when all the columns names are validated and formatted
	 */
	return [
		...acc,
		`${columnMetadata.databaseName}${columnMetadata.isArray ? "[]" : ""}`,
	].join(".");
};
