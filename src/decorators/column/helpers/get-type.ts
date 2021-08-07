import { CompassError } from "../../../error";
import { CompassErrorCodeEnum } from "../../../error/types/error-code.enum";
import { MetadataType } from "../../../metadata-manager/types/metadata-type";
import { MetadataUtil } from "../../../utils/metadata-util";
import { ColumnOptions } from "../../types/column-options";

interface GetTypeParams {
	entityPrototype: any;
	propertyName: string;
	typeOrOptions?: ColumnOptions | MetadataType;
}

export const getType = ({
	entityPrototype,
	propertyName,
	typeOrOptions,
}: GetTypeParams) => {
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
		/**
		 * If the type is passed directly
		 * Ex: @Column(Type)
		 */
		if (MetadataUtil.isMetadataType(typeOrOptions)) {
			return {
				type: typeOrOptions,
				isArray: true,
			};
		}

		/**
		 * If the type is passed in the options
		 * Ex: @Column({ type: Type })
		 */
		if (MetadataUtil.isMetadataType((typeOrOptions as ColumnOptions).type)) {
			return {
				type: (typeOrOptions as ColumnOptions).type,
				isArray: true,
			};
		}

		/**
		 * When array, the type must be explicitly declared
		 */
		return CompassError.throw({
			code: CompassErrorCodeEnum.INVALID_PARAM_TYPE,
			origin: "COMPASS",
			message: "You must explicitly declare array types",
			details: [
				`Entity: ${entityPrototype.constructor.name}`,
				`Column: ${propertyName}`,
			],
		});
	}

	/**
	 * If the type is get automatically
	 * Ex: @Column(Type)
	 */
	if (MetadataUtil.isMetadataType(reflectType)) {
		return {
			type: reflectType,
		};
	}

	/**
	 * If the type is passed directly
	 * Ex: @Column(Type)
	 */
	if (MetadataUtil.isMetadataType(typeOrOptions)) {
		return {
			type: typeOrOptions,
		};
	}

	/**
	 * If the type cannot be guessed or isn't supported
	 */
	return CompassError.throw({
		code: CompassErrorCodeEnum.INVALID_PARAM_TYPE,
		origin: "COMPASS",
		message: "Column type isn't supported.",
		details: [
			`Entity: ${entityPrototype.constructor.name}`,
			`Column: ${propertyName}`,
		],
	});
};
