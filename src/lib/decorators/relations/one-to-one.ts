import { getType } from "../@helpers/get-type";
import { OneToOneOptions } from "../types/relation-options";
import { addRelationToEntityMetadata } from "./helpers/merge-entity-metadata";
import { validateForeignKey } from "./helpers/validate-foreign-key";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const OneToOne = <RelationExtraMetadata>({
	relationMap: rawRelationMap,
	...metadata
}: OneToOneOptions<RelationExtraMetadata>) => {
	return (entityPrototype: any, propertyName: string) => {
		const entityConstructor = entityPrototype.constructor;

		const { type: targetEntity } = getType({
			entityPrototype,
			propertyName,
			acceptedTypes: ["custom-class"],
			cannotBeArray: true,
		});

		const relationMap = validateForeignKey({
			relationMap: rawRelationMap,
			targetEntity,
			currentEntity: entityConstructor,
		});

		addRelationToEntityMetadata({
			entityConstructor,
			relation: {
				type: "ONE_TO_ONE",
				targetEntity,
				relationMap,
				relationColumn: propertyName,
				...metadata,
			},
		});
	};
};
