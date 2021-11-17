import { getType } from "../columns/helpers/get-type";
import { ManyToOneOptions } from "../types/relation-options";
import { addRelationToEntityMetadata } from "./helpers/merge-entity-metadata";
import { validateForeignKey } from "./helpers/validate-foreign-key";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ManyToOne = <RelationExtraMetadata>({
	relationMap: rawRelationMap,
	...metadata
}: ManyToOneOptions<RelationExtraMetadata>) => {
	return (entityPrototype: any, propertyName: string) => {
		const entityConstructor = entityPrototype.constructor;

		const { type: targetEntity } = getType({
			entityPrototype,
			propertyName,
			acceptedTypes: ["custom-class"],
		});

		const relationMap = validateForeignKey({
			relationMap: rawRelationMap,
			targetEntity,
			currentEntity: entityConstructor,
			foreignKeyEntity: "current",
		});

		addRelationToEntityMetadata({
			entityConstructor,
			relation: {
				type: "MANY_TO_ONE",
				relationMap,
				relationColumn: propertyName,
				targetEntity,
				...metadata,
			},
		});
	};
};
