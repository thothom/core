import { cleanObj } from "@techmmunity/utils";
import { Relation } from "../../../entity-manager/types/entity-metadata";
import { MetadataUtil } from "../../../utils/metadata-util";

interface MergeEntityMetadataParams {
	entityConstructor: any;
	relation: Relation;
}

export const addRelationToEntityMetadata = ({
	entityConstructor,
	relation,
}: MergeEntityMetadataParams) => {
	const entityMetadata = MetadataUtil.getAllEntityMetadata({
		entity: entityConstructor,
	});

	MetadataUtil.defineAllEntityMetadata({
		entity: entityConstructor,
		metadata: {
			...entityMetadata,
			relations: [...(entityMetadata.relations || []), cleanObj(relation)],
		},
	});
};
