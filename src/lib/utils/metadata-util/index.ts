/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	EntityMetadata,
	ENTITY_METADATA_KEYS,
} from "../../entity-manager/types/metadata";
import {
	DefineAllEntityMetadataParams,
	DefineEntityMetadataParams,
	GetAllEntityMetadataParams,
	GetEntityMetadataParams,
} from "./types/method-params";

const formatMetadataKey = (metadataKey: string) =>
	`compass:entity:${metadataKey.toLowerCase()}`;

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

	public static hasEntityMetadata({
		metadataKey,
		entity,
	}: GetEntityMetadataParams) {
		const formattedMetadataKey = formatMetadataKey(metadataKey);

		return Reflect.hasMetadata(formattedMetadataKey, entity);
	}

	public static getEntityMetadata({
		metadataKey,
		entity,
	}: GetEntityMetadataParams) {
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
			/**
			 * TypeScript doesn't accepts this, but it's right,
			 * so it's necessary to use ts-ignore
			 */
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			acc[metadataKey] = MetadataUtil.getEntityMetadata({
				metadataKey,
				entity,
			});

			return acc;
			// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
		}, {} as EntityMetadata<EntityExtraMetadata, ColumnExtraMetadata>);
	}
}
