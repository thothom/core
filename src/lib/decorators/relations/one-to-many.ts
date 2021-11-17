import { getType } from "../@helpers/get-type";
import { OneToManyOptions } from "../types/relation-options";
import { addRelationToEntityMetadata } from "./helpers/merge-entity-metadata";
import { validateForeignKey } from "./helpers/validate-foreign-key";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const OneToMany = <RelationExtraMetadata>({
	targetEntity: suggestedTargetEntity,
	relationMap: rawRelationMap,
	...metadata
}: OneToManyOptions<RelationExtraMetadata>) => {
	return (entityPrototype: any, propertyName: string) => {
		const entityConstructor = entityPrototype.constructor;

		const { type: targetEntity } = getType({
			entityPrototype,
			propertyName,
			suggestedType: suggestedTargetEntity,
			acceptedTypes: ["custom-class"],
			mustBeArray: true,
		});

		const relationMap = validateForeignKey({
			relationMap: rawRelationMap,
			targetEntity,
			currentEntity: entityConstructor,
			foreignKeyEntity: "target",
		});

		addRelationToEntityMetadata({
			entityConstructor,
			relation: {
				type: "ONE_TO_MANY",
				targetEntity,
				relationMap,
				relationColumn: propertyName,
				...metadata,
			},
		});
	};
};
