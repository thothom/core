/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	EntityMetadata,
	ENTITY_METADATA_KEYS,
} from "../../metadata-manager/types/metadata";
import {
	DefineAllEntityMetadataParams,
	DefineEntityMetadataParams,
	GetAllEntityMetadataParams,
	GetEntityMetadataParams,
} from "./types/method-params";

export class MetadataUtil {
	public static isDefaultMetadataType(type: any) {
		return type === Date || type === Number || type === String;
	}

	public static isCustomMetadataType(type: any) {
		return typeof type === "function" && /^\s*class\s+/.test(type.toString());
	}

	public static isMetadataType(type: any) {
		return (
			MetadataUtil.isDefaultMetadataType(type) ||
			MetadataUtil.isCustomMetadataType(type)
		);
	}

	public static getEntityMetadata({
		metadataKey,
		entity,
	}: GetEntityMetadataParams) {
		return Reflect.getMetadata(
			`compass:entity:${metadataKey.toString()}`,
			entity,
		);
	}

	public static defineEntityMetadata({
		metadataKey,
		metadataValue,
		entity,
	}: DefineEntityMetadataParams) {
		Reflect.defineMetadata(
			`compass:entity:${metadataKey.toString()}`,
			metadataValue,
			entity,
		);
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
			if (metadataValue) {
				MetadataUtil.defineEntityMetadata({
					metadataKey,
					metadataValue,
					entity,
				});
			}
		});
	}

	public static getAllEntityMetadata<EntityExtraMetadata, ColumnExtraMetadata>({
		entity,
	}: GetAllEntityMetadataParams) {
		return ENTITY_METADATA_KEYS.reduce((acc, metadataKey) => {
			acc[metadataKey as keyof typeof acc] = MetadataUtil.getEntityMetadata({
				metadataKey,
				entity,
			});

			return acc;
			// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
		}, {} as EntityMetadata<EntityExtraMetadata, ColumnExtraMetadata>);
	}
}
