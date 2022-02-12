import { Plus } from "../../repository/operators/save/plus";
import { getOptions } from "../@helpers/get-options";

import { makeColumnDecorator } from "./helpers/make-column-decorator";

import type { DatabaseEvents } from "../../entity-manager/types/database-events";
import type { CountColumnOptions } from "../types/column-options";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CountColumn = <ColumnExtraMetadata = any>(
	eventsOrOptions:
		| Array<DatabaseEvents>
		| CountColumnOptions<ColumnExtraMetadata>,
) => {
	const { name, ...metadata } =
		getOptions<CountColumnOptions<ColumnExtraMetadata>>(eventsOrOptions);

	const events = Array.isArray(eventsOrOptions)
		? eventsOrOptions
		: eventsOrOptions.events;

	return makeColumnDecorator({
		metadata: {
			...metadata,
			databaseName: name,
			autoGenerateOnlyOnEvents: events,
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			autoGenerate: Plus(1),
		},
		acceptedTypes: ["number"],
	});
};
