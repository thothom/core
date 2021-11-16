import { RelationOptions } from "../types/relation-options";
import { addRelationToEntityMetadata } from "./helpers/merge-entity-metadata";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const OneToOne = ({
	targetEntity,
	relationMap,
	extras,
}: RelationOptions) => {
	return (entityConstructor: any) => {
		addRelationToEntityMetadata({
			entityConstructor,
			relation: {
				type: "ONE_TO_ONE",
				targetEntity,
				relationMap,
				extras,
			},
		});
	};
};
