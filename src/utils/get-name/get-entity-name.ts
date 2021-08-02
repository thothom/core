import { EntityMetadataEnum } from "../../enums/entity-metadata";
import { BaseConnectionOptions } from "../../types/connection";
import { formatNamingPattern } from "../format-naming-pattern";
import { handlePrefixSuffix } from "./helpers/handle-prefix-suffix";

interface GetTableNameParams {
	entity: any;
	connectionOptions: BaseConnectionOptions;
	convert: "FROM_code_TO_database" | "FROM_database_TO_code";
}

export const getEntityName = ({
	entity,
	connectionOptions,
	convert,
}: GetTableNameParams): string => {
	const entityName = handlePrefixSuffix({
		connectionOptions,
		value: Reflect.getMetadata(EntityMetadataEnum.NAME, entity),
		convert,
		type: "entity",
	});

	const convertTo = convert === "FROM_code_TO_database" ? "database" : "code";

	return formatNamingPattern({
		value: entityName,
		namingPattern: connectionOptions.namingPattern?.entity?.[convertTo],
	});
};
