import { RelationOptions } from "../types/relation-options";
import { addRelationToEntityMetadata } from "./helpers/merge-entity-metadata";
import { validateForeignKey } from "./helpers/validate-foreign-key";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const OneToMany = <RelationExtraMetadata>({
	foreignKey,
	targetEntity,
	relationMap,
	extras,
}: RelationOptions<RelationExtraMetadata>) => {
	return (entityConstructor: any) => {
		validateForeignKey({
			foreignKey,
			targetEntity,
			currentEntity: entityConstructor,
		});

		addRelationToEntityMetadata({
			entityConstructor,
			relation: {
				type: "ONE_TO_MANY",
				foreignKey,
				targetEntity,
				relationMap,
				extras,
			},
		});
	};
};
