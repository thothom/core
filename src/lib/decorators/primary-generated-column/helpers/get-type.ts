import { SymbiosisError } from "../../../error";
import { SymbiosisErrorCodeEnum } from "../../../error/types/error-code.enum";
import { MetadataUtil } from "../../../utils/metadata-util";

interface GetTypeParams {
	entityPrototype: any;
	propertyName: string;
}

export const getType = ({ entityPrototype, propertyName }: GetTypeParams) => {
	const reflectType = Reflect.getMetadata(
		"design:type",
		entityPrototype,
		propertyName,
	);

	/**
	 * If the type is get automatically
	 */
	if (MetadataUtil.isDefaultMetadataType(reflectType)) {
		return reflectType;
	}

	/**
	 * PrimaryColumns only can have simple types, types like
	 * Objects, Array or Classes AREN'T supported
	 */
	throw new SymbiosisError({
		code: SymbiosisErrorCodeEnum.INVALID_PARAM_TYPE,
		origin: "SYMBIOSIS",
		message:
			"Primary columns can only have simple types, ARRAYS, OBJECTS and CLASSES aren't supported",
		details: [
			`Entity: ${entityPrototype.constructor.name}`,
			`Column: ${propertyName}`,
		],
	});
};
