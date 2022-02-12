/* eslint-disable @typescript-eslint/no-var-requires */

import { DateUtil } from "../../../../utils/date";

import type { BaseConnectionOptions } from "../../../../connection/types/connection-options";
import type { MetadataType } from "../../../types/metadata-type";

export const generateDate = (
	type: MetadataType,
	connectionOptions: BaseConnectionOptions,
) => {
	const timeZone = connectionOptions.timeZone || "UTC";

	switch (type) {
		case String:
			return DateUtil.nowIso(timeZone);
		case Number:
			return DateUtil.nowEpoch(timeZone);
		case Date:
		default:
			return DateUtil.nowDate(timeZone);
	}
};
