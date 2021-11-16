export interface RelationOptions<RelationExtraMetadata = any> {
	targetEntity: any;
	relationMap: Record<string, string>;
	extras?: RelationExtraMetadata;
}
