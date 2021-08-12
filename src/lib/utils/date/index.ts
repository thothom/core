import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const DEFAULT_TIMEZONE = "UTC";

export class DateUtil {
	public static nowDate(tz: string = DEFAULT_TIMEZONE) {
		return dayjs().tz(tz).toDate();
	}

	public static nowIso(tz: string = DEFAULT_TIMEZONE) {
		return dayjs().tz(tz).toISOString();
	}

	public static nowEpoch(tz: string = DEFAULT_TIMEZONE) {
		return dayjs().tz(tz).valueOf();
	}
}
