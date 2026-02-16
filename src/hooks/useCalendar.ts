import { useMemo, useState } from "react";

export function useCalendar(dateString?: string) {
	const selectedDate = useMemo(() => {
		if (!dateString) return undefined;
		return new Date(`${dateString}T00:00:00`);
	}, [dateString]);

	const [month, setMonth] = useState<Date | undefined>(() => selectedDate);

	return {
		selectedDate,
		month,
		setMonth,
	};
}
