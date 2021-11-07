import { CountColumnOptions } from "../types/column-options";
import { getOptions } from "../helpers/get-options";
import { makeColumnDecorator } from "./helpers/make-column-decorator";
import { Plus } from "../../repository/operators/save/plus";
import { DatabaseEvents } from "../../entity-manager/types/database-events";

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
