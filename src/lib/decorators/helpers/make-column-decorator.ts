import { cleanObj, getEnumValues } from "@techmmunity/utils";
import { ColumnMetadata } from "../../entity-manager/types/column-metadata";
import { MetadataType } from "../../entity-manager/types/metadata-type";
import { MetadataUtil } from "../../utils/metadata-util";
import { getType, GetTypeParams } from "./get-type";

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
		const { type, isArray } = getType({
			entityPrototype,
			propertyName,
			acceptedTypes,
			suggestedType,
		});

		const metadata = cleanObj({
			...rawMetadata,
			type,
			isArray,
			name: propertyName,
			databaseName: rawMetadata.databaseName || propertyName,
			enumValues: rawMetadata.enum
				? getEnumValues<number | string>(rawMetadata.enum)
				: undefined,
			isNameAlreadyFormatted: rawMetadata.databaseName ? true : undefined,
		});

		MetadataUtil.addColumnMetadataToEntity({
			entity: entityPrototype.constructor,
			metadata,
		});
	};
