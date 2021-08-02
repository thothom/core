export enum ColumnMetadataEnum {
	NAME = "compass:column:name",
	TYPE = "compass:column:type",
	IS_ARRAY = "compass:column:is-array",
	PRIMARY = "compass:column:primary",
}

/**
 * When a new type of metadata is added, you also
 * needs to include this on src/utils/metadata/get-column-metadata.ts
 */
