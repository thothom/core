import { MetadataUtil } from "../../../..";
import {
	Relation,
	RelationMap,
} from "../../../entity-manager/types/entity-metadata";
import { SymbiosisError } from "../../../error";

interface ValidateForeignKeyParams {
	currentEntity: any;
	targetEntity: any;
	relationMap:
		| Array<Optional<RelationMap, "foreignKeyEntity">>
		| Optional<RelationMap, "foreignKeyEntity">;
	foreignKeyEntity?: RelationMap["foreignKeyEntity"];
}

const validateColumnExists = (entity: any, columnName: string) => {
	const currentEntityColumns = MetadataUtil.getEntityMetadata<"columns">({
		metadataKey: "columns",
		entity,
	});

	const currentEntityColumn = currentEntityColumns.find(
		c => c.name === columnName,
	);

	if (!currentEntityColumn) {
		throw new SymbiosisError({
			code: "INVALID_PARAM",
			origin: "SYMBIOSIS",
			message: "Invalid Foreign Key",
			details: [
				`Column "${columnName}" does not exist in entity "${entity.name}"`,
			],
		});
	}
};

export const validateForeignKey = ({
	currentEntity,
	targetEntity,
	foreignKeyEntity,
	relationMap: rawRelationMap,
}: ValidateForeignKeyParams): Relation["relationMap"] => {
	const formattedRelationMap: Relation["relationMap"] = [];

	const relationMap = Array.isArray(rawRelationMap)
		? rawRelationMap
		: [rawRelationMap];

	for (const relation of relationMap) {
		validateColumnExists(currentEntity, relation.columnName);

		validateColumnExists(targetEntity, relation.targetColumnName);

		const validatedForeignKey = relation.foreignKeyEntity || foreignKeyEntity;

		if (!validatedForeignKey) {
			throw new SymbiosisError({
				code: "INVALID_PARAM",
				origin: "SYMBIOSIS",
				message: "Invalid Foreign Key Entity",
				details: [
					'"foreignKeyEntity" must be "current" or "target", but received "undefined"',
				],
			});
		}

		formattedRelationMap.push({
			...relation,
			foreignKeyEntity: validatedForeignKey,
		});
	}

	return formattedRelationMap;
};
