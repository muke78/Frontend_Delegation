import type { Pagination } from "@/services/api/types";

export const getPaginationRange = (
	current: number,
	total: number,
	delta = 5,
) => {
	if (total <= 1) {
		return total === 1 ? [1] : [];
	}

	const range: (number | "...")[] = [];

	const left = Math.max(2, current - delta);
	const right = Math.min(total - 1, current + delta);

	range.push(1);

	if (left > 2) range.push("...");

	for (let i = left; i <= right; i++) {
		range.push(i);
	}

	if (right < total - 1) range.push("...");

	if (total > 1) range.push(total);

	return range;
};

export const getRowIndex = (pagination: Pagination, idx: number) =>
	(pagination.currentPage - 1) * pagination.recordsPerPage + idx + 1;
