import { RelationOptions } from "../types/relation-options";
import { addRelationToEntityMetadata } from "./helpers/merge-entity-metadata";
import { validateForeignKey } from "./helpers/validate-foreign-key";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ManyToOne = ({
	foreignKey,
	targetEntity,
	relationMap,
	extras,
}: RelationOptions) => {
	return (entityConstructor: any) => {
		validateForeignKey({
			foreignKey,
			targetEntity,
			currentEntity: entityConstructor,
		});

		addRelationToEntityMetadata({
			entityConstructor,
			relation: {
				type: "MANY_TO_ONE",
				foreignKey,
				targetEntity,
				relationMap,
				extras,
			},
		});
	};
};
