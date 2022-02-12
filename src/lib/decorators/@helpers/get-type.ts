import { getTypeof } from "@techmmunity/utils";

import { SymbiosisError } from "../../error";

import { MetadataUtil } from "../../utils/metadata-util";

import type { MetadataType } from "../../entity-manager/types/metadata-type";
import type { MetadataName } from "../../types/metadata-name";

const ERROR_MESSAGE = "Column type isn't supported";

type AcceptedTypes = MetadataName | "all";

// eslint-disable-next-line import/exports-last
export interface GetTypeParams {
	entityPrototype: any;
	propertyName: string;
	acceptedTypes?: Array<AcceptedTypes>;
	suggestedType?: MetadataType;
	enumValues?: Array<number | string>;
}

interface GetTypeResult {
	type: MetadataType;
	isArray?: true;
}

const handleUnacceptedType = (
	acceptedTypes: Array<AcceptedTypes>,
	type: MetadataType,
	entityPrototype: any,
	propertyName: string,
) => {
	const typeName = MetadataUtil.getMetadataName(type);

	if (!acceptedTypes.includes("all") && !acceptedTypes.includes(typeName)) {
		throw new SymbiosisError({
			code: "INVALID_PARAM_TYPE",
			origin: "SYMBIOSIS",
			message: ERROR_MESSAGE,
			details: [
				`Entity: ${entityPrototype.constructor.name}`,
				`Column: ${propertyName}`,
			],
		});
	}
};

export const getType = ({
	entityPrototype,
	propertyName,
	suggestedType,
	enumValues,
	acceptedTypes = ["all"],
}: GetTypeParams): GetTypeResult => {
	const reflectType = Reflect.getMetadata(
		"design:type",
		entityPrototype,
		propertyName,
	);

	/**
	 * If it's an array, the type of the array items can't be determined,
	 * so they have to be defined manually
	 */
	if (reflectType === Array) {
		handleUnacceptedType(acceptedTypes, "array", entityPrototype, propertyName);

		/**
		 * If the type is passed directly
		 * Ex: @Column(Type)
		 */
		if (suggestedType && MetadataUtil.isMetadataType(suggestedType)) {
			return {
				type: suggestedType,
				isArray: true,
			};
		}

		/**
		 * When array, the type must be explicitly declared
		 */
		throw new SymbiosisError({
			code: "INVALID_PARAM_TYPE",
			origin: "SYMBIOSIS",
			message: "You must explicitly declare array types",
			details: [
				`Entity: ${entityPrototype.constructor.name}`,
				`Column: ${propertyName}`,
			],
		});
	}

	/**
	 * If the type is get automatically
	 */
	if (MetadataUtil.isMetadataType(reflectType)) {
		handleUnacceptedType(
			acceptedTypes,
			reflectType,
			entityPrototype,
			propertyName,
		);

		return {
			type: reflectType,
		};
	}

	if (enumValues) {
		const [firstValue] = enumValues;

		switch (getTypeof(firstValue)) {
			case "string":
				return {
					type: String,
				};
			case "number":
				return {
					type: Number,
				};
			default:
				throw new SymbiosisError({
					code: "INVALID_PARAM_TYPE",
					origin: "SYMBIOSIS",
					message: ERROR_MESSAGE,
					details: [
						`Entity: ${entityPrototype.constructor.name}`,
						`Column: ${propertyName}`,
					],
				});
		}
	}

	/**
	 * If the type cannot be guessed or isn't supported
	 */
	throw new SymbiosisError({
		code: "INVALID_PARAM_TYPE",
		origin: "SYMBIOSIS",
		message: ERROR_MESSAGE,
		details: [
			`Entity: ${entityPrototype.constructor.name}`,
			`Column: ${propertyName}`,
		],
	});
};
