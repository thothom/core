import { getTypeof } from "@techmmunity/utils";

import type { ColumnMetadata } from "../../../types/column-metadata";
import type { DatabaseEvents } from "../../../types/database-events";

interface ShouldAutoGenerateParams {
	columnMetadata: ColumnMetadata;
	events: Array<DatabaseEvents>;
}

const matchesBasicValidation = (columnMetadata: ColumnMetadata) =>
	getTypeof(columnMetadata.autoGenerate) !== "undefined";

const matchesEventToAutoGenerate = ({
	columnMetadata,
	events,
}: ShouldAutoGenerateParams) => {
	/**
	 * Verify if any of the events that triggered this function
	 * matches with any of the events that trigger the column
	 * auto-generation
	 */
	return events.some(event =>
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		columnMetadata.autoGenerateOnlyOnEvents!.includes(event),
	);
};

export const shouldAutoGenerate = ({
	columnMetadata,
	events,
}: ShouldAutoGenerateParams) => {
	if (matchesBasicValidation(columnMetadata)) {
		return matchesEventToAutoGenerate({ columnMetadata, events });
	}

	return false;
};
