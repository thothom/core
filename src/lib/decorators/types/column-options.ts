import { MetadataType } from "../../metadata-manager/types/metadata-type";

export interface BaseColumnOptions {
	name?: string;
	extras?: any;
}

export interface ColumnOptions extends BaseColumnOptions {
	type?: MetadataType;
}

export type PrimaryColumnOptions = BaseColumnOptions;
