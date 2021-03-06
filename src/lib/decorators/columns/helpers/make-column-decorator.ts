import { cleanObj, getEnumValues } from "@techmmunity/utils";

import type { GetTypeParams } from "../../@helpers/get-type";
import { getType } from "../../@helpers/get-type";

import { MetadataUtil } from "../../../utils/metadata-util";

import type { ColumnMetadata } from "../../../entity-manager/types/column-metadata";
import type { MetadataType } from "../../../entity-manager/types/metadata-type";

type GetTypeOutput = "isArray" | "type";
type MetadataToOmit = GetTypeOutput | "enumValues" | "name";

// eslint-disable-next-line import/exports-last
export interface MakeAutoGenerateParams {
	type: MetadataType;
}

interface MetadataParam extends Partial<Omit<ColumnMetadata, MetadataToOmit>> {
	enum?: any;
}

interface MakeColumnDecoratorParams {
	metadata: MetadataParam;
	acceptedTypes?: GetTypeParams["acceptedTypes"];
	suggestedType?: GetTypeParams["suggestedType"];
}

export const makeColumnDecorator =
	({
		metadata: rawMetadata,
		acceptedTypes,
		suggestedType,
	}: MakeColumnDecoratorParams) =>
	(entityPrototype: any, propertyName: string) => {
		const enumValues = rawMetadata.enum
			? getEnumValues<number | string>(rawMetadata.enum)
			: undefined;

		const { type, isArray } = getType({
			entityPrototype,
			propertyName,
			acceptedTypes,
			suggestedType,
			enumValues,
		});

		const databaseName = rawMetadata.databaseName || propertyName;

		const metadata = cleanObj({
			...rawMetadata,
			type,
			isArray,
			enumValues,
			databaseName,
			name: propertyName,
			enumName: enumValues ? `${databaseName}_enum` : undefined,
			isNameAlreadyFormatted: rawMetadata.databaseName ? true : undefined,
		});

		MetadataUtil.addColumnMetadataToEntity({
			entity: entityPrototype.constructor,
			metadata,
		});
	};
