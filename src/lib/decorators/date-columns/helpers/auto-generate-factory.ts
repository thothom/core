import { BaseConnectionOptions } from "../../../connection/types/connection-options";
import { DateUtil } from "../../../utils/date";

export const autoGenerateFactory =
	(type: any) => (connectionOptions: BaseConnectionOptions) => {
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
