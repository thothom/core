class CustomClass {}

export type MetadataType =
	| CustomClass
	| DateConstructor
	| NumberConstructor
	| StringConstructor;

export const isDefaultMetadataType = (type: any) =>
	type === Date || type === Number || type === String;

export const isCustomMetadataType = (type: any) =>
	typeof type === "function" && /^\s*class\s+/.test(type.toString());

export const isMetadataType = (type: any) =>
	isDefaultMetadataType(type) || isCustomMetadataType(type);
