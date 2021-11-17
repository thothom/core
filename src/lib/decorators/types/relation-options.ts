import { RelationMap } from "../../entity-manager/types/entity-metadata";

type RelationWithoutForeignKey = Omit<RelationMap, "foreignKeyEntity">;

export interface OneToOneOptions<RelationExtraMetadata = any> {
	relationMap: Array<RelationMap> | RelationMap;
	extras?: RelationExtraMetadata;
}

export interface OneToManyOptions<RelationExtraMetadata = any> {
	targetEntity: any;
	relationMap: Array<RelationWithoutForeignKey> | RelationWithoutForeignKey;
	extras?: RelationExtraMetadata;
}

export interface ManyToOneOptions<RelationExtraMetadata = any> {
	relationMap: Array<RelationWithoutForeignKey> | RelationWithoutForeignKey;
	extras?: RelationExtraMetadata;
}
