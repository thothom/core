import { DatabaseEntity } from "../../../../types/database-entity";
import { ColumnMetadata } from "../../../types/column-metadata";

interface GenerateDefaultValueParams {
	columnMetadata: ColumnMetadata;
	acc: DatabaseEntity;
}

/**
 * WARNING: THIS FUNCTION HAS MUTABILITY!!!!
 */
export const generateDefaultValue = ({
	columnMetadata,
	acc,
}: GenerateDefaultValueParams) => {
	const defaultValue = columnMetadata.defaultValue;

	if (typeof defaultValue !== "undefined") {
		if (typeof defaultValue === "function") {
			acc[columnMetadata.databaseName] = defaultValue();
		} else {
			acc[columnMetadata.databaseName] = defaultValue;
		}
	}
};
