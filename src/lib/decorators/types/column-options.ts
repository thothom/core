import { MetadataType } from "../../entity-manager/types/metadata-type";
import { PrimaryGeneratedColumnStrategy } from "../primary-generated-column";

export interface BaseColumnOptions {
	name?: string;
	extras?: any;
}

export interface ColumnOptions extends BaseColumnOptions {
	type?: MetadataType;
}

export type PrimaryColumnOptions = BaseColumnOptions;

export interface PrimaryGeneratedColumnOptions extends BaseColumnOptions {
	strategy?: PrimaryGeneratedColumnStrategy;
}

export type DateColumnOptions = BaseColumnOptions;
