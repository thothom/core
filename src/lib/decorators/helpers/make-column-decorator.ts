import { cleanObj } from "@techmmunity/utils";
import { ColumnMetadata } from "../../entity-manager/types/column-metadata";
import { MetadataType } from "../../entity-manager/types/metadata-type";
import { MetadataUtil } from "../../utils/metadata-util";
import { getType, GetTypeParams } from "./get-type";

type GetTypeOutput = "isArray" | "type";
type MetadataToOmit = GetTypeOutput | "name";

// eslint-disable-next-line import/exports-last
export interface MakeAutoGenerateParams {
	type: MetadataType;
}

interface MakeColumnDecoratorParams {
	metadata: Partial<Omit<ColumnMetadata, MetadataToOmit>>;
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
			isNameAlreadyFormatted: rawMetadata.databaseName ? true : undefined,
		});

		MetadataUtil.addColumnMetadataToEntity({
			entity: entityPrototype.constructor,
			metadata,
		});
	};
