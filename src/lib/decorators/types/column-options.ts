import { PreDefinedAutoGenerationMethods } from "../../entity-manager/types/column-metadata";
import { MetadataType } from "../../entity-manager/types/metadata-type";

export interface BaseColumnOptions {
	name?: string;
	comment?: string;
	extras?: any;
}

export interface ColumnOptions extends BaseColumnOptions {
	defaultValue?: any;
	type?: MetadataType;
}

export type PrimaryColumnOptions = BaseColumnOptions;

export interface PrimaryGeneratedColumnOptions extends BaseColumnOptions {
	strategy?: PreDefinedAutoGenerationMethods;
}

export type DateColumnOptions = BaseColumnOptions;
