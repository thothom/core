export const getTimestamp = () =>
	new Date(Date.now()).toLocaleString(undefined, {
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		day: "2-digit",
		month: "2-digit",
	});
