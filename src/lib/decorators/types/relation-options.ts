export interface RelationOptions<RelationExtraMetadata = any> {
	targetEntity: any;
	foreignKey: string;
	relationMap: Record<string, string>;
	extras?: RelationExtraMetadata;
}
