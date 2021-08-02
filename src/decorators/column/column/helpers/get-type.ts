import { BaseClass } from "../../../../types/class";
import { ColumnOptions } from "../../../../types/options/column-options";
import {
	isMetadataType,
	MetadataType,
} from "../../../../utils/metadata/is-metadata-type";

interface GetTypeParams {
	target: BaseClass;
	propertyName: string;
	typeOrOptions?: ColumnOptions | MetadataType;
}

export const getType = ({
	target,
	propertyName,
	typeOrOptions,
}: GetTypeParams) => {
	const reflectType = Reflect.getMetadata("design:type", target, propertyName);

	/**
	 * If it's an array, the type of the array items can't be determined,
	 * so they have to be defined manually
	 */
	if (reflectType === Array) {
		/**
		 * If the type is passed directly
		 * Ex: @Column(Type)
		 */
		if (isMetadataType(typeOrOptions)) {
			return {
				type: typeOrOptions,
				isArray: true,
			};
		}

		/**
		 * If the type is passed in the options
		 * Ex: @Column({ type: Type })
		 */
		if (isMetadataType((typeOrOptions as ColumnOptions).type)) {
			return {
				type: (typeOrOptions as ColumnOptions).type,
				isArray: true,
			};
		}

		/**
		 * // TODO Throw error: When array, the type must
		 * be specified
		 */
		return {};
	}

	/**
	 * If the type is get automatically
	 * Ex: @Column(Type)
	 */
	if (isMetadataType(reflectType)) {
		return {
			type: reflectType,
		};
	}

	/**
	 * If the type is passed directly
	 * Ex: @Column(Type)
	 */
	if (isMetadataType(typeOrOptions)) {
		return {
			type: typeOrOptions,
		};
	}

	/**
	 * If the type cannot be guessed or isn't supported
	 * // TODO Return error
	 */
	return {};
};
