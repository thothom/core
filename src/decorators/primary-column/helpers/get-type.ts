import { isDefaultMetadataType } from "../../../utils/metadata/is-metadata-type";

interface GetTypeParams {
	target: any;
	propertyName: string;
}

export const getType = ({ target, propertyName }: GetTypeParams) => {
	const reflectType = Reflect.getMetadata("design:type", target, propertyName);

	/**
	 * If the type is get automatically
	 * Ex: @Column(Type)
	 */
	if (isDefaultMetadataType(reflectType)) {
		return reflectType;
	}

	/**
	 * PrimaryColumns only can have simple types, types like
	 * Objects, Array or Classes AREN'T supported
	 * // TODO Return error
	 */
};
