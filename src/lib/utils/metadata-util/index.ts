/* eslint-disable @typescript-eslint/no-explicit-any */

import { getTypeof } from "@techmmunity/utils";

import { METADATA_PREFIX } from "../../../config";

import type { ColumnMetadata } from "../../entity-manager/types/column-metadata";
import { COLUMN_METADATA_KEYS } from "../../entity-manager/types/column-metadata";
import type { EntityMetadata } from "../../entity-manager/types/entity-metadata";
import { ENTITY_METADATA_KEYS } from "../../entity-manager/types/entity-metadata";
import type { MetadataName } from "../../types/metadata-name";
import type {
	AddColumnMetadataToEntityParams,
	DefineAllEntityMetadataParams,
	DefineEntityMetadataParams,
	GetAllEntityMetadataParams,
	GetEntityMetadataParams,
} from "./types/method-params";

const formatMetadataKey = (metadataKey: string) =>
	`${METADATA_PREFIX}${metadataKey.toLowerCase()}`;

export class MetadataUtil {
	public static isDefaultMetadataType(type: any) {
		return (
			type === Date || type === Number || type === String || type === Boolean
		);
	}

	public static isCustomMetadataType(type: any) {
		return getTypeof(type) === "class";
	}

	public static isMetadataType(type: any) {
		return (
			MetadataUtil.isDefaultMetadataType(type) ||
			MetadataUtil.isCustomMetadataType(type)
		);
	}

	public static getMetadataName(type: any): MetadataName {
		if (MetadataUtil.isDefaultMetadataType(type)) {
			return type.name.toLowerCase();
		}

		return "custom-class";
	}

	public static hasEntityMetadata({
		metadataKey,
		entity,
	}: GetEntityMetadataParams) {
		const formattedMetadataKey = formatMetadataKey(metadataKey);

		return Reflect.hasMetadata(formattedMetadataKey, entity);
	}

	public static getEntityMetadata<Key extends keyof EntityMetadata = any>({
		metadataKey,
		entity,
	}: GetEntityMetadataParams): EntityMetadata[Key] {
		const formattedMetadataKey = formatMetadataKey(metadataKey);

		return Reflect.getMetadata(formattedMetadataKey, entity);
	}

	public static defineEntityMetadata({
		metadataKey,
		metadataValue,
		entity,
	}: DefineEntityMetadataParams) {
		const formattedMetadataKey = formatMetadataKey(metadataKey);

		Reflect.defineMetadata(formattedMetadataKey, metadataValue, entity);
	}

	public static addColumnMetadataToEntity({
		metadata,
		entity,
	}: AddColumnMetadataToEntityParams) {
		const columnMetadata = COLUMN_METADATA_KEYS.reduce((acc, metadataKey) => {
			const value = metadata[metadataKey];

			if (getTypeof(value) === "undefined") {
				return acc;
			}

			acc[metadataKey] = value;

			return acc;
		}, {} as ColumnMetadata<any>);

		const entityColumns = (MetadataUtil.getEntityMetadata({
			metadataKey: "columns",
			entity,
		}) || []) as Array<ColumnMetadata>;

		MetadataUtil.defineEntityMetadata({
			entity,
			metadataKey: "columns",
			metadataValue: [...entityColumns, columnMetadata],
		});
	}

	public static defineAllEntityMetadata({
		metadata,
		entity,
	}: DefineAllEntityMetadataParams) {
		ENTITY_METADATA_KEYS.forEach(metadataKey => {
			const metadataValue = metadata[metadataKey];

			/**
			 * Does this validation because some fields are optional
			 */
			if (getTypeof(metadataValue) === "undefined") return;

			MetadataUtil.defineEntityMetadata({
				metadataKey,
				metadataValue,
				entity,
			});
		});
	}

	public static getAllEntityMetadata<
		EntityExtraMetadata = any,
		ColumnExtraMetadata = any,
		IndexExtraMetadata = any,
	>({ entity }: GetAllEntityMetadataParams) {
		return ENTITY_METADATA_KEYS.reduce((acc, metadataKey) => {
			const value = MetadataUtil.getEntityMetadata({
				metadataKey,
				entity,
			});

			if (getTypeof(value) === "undefined") {
				return acc;
			}

			/**
			 * TypeScript doesn't accepts this, but it's right,
			 * so it's necessary to use ts-ignore
			 */
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			acc[metadataKey] = value;

			return acc;
		}, {} as EntityMetadata<EntityExtraMetadata, ColumnExtraMetadata, IndexExtraMetadata>);
	}
}
