import type { UUID } from "@/modules/archives/types";
import { apiFetch } from "@/services/api/api";

// List related query params
export const listRelated = (params) => {};

// List references through a file
export const listRelatedThroughFile = (params, archiveId: UUID) => {
	const searchParams = new URLSearchParams();

	Object.entries(params ?? {}).forEach(([key, value]) => {
		if (value !== undefined && value !== "") {
			searchParams.append(key, String(value));
		}
	});

	const query = searchParams.toString();

	return apiFetch(`/archives/${archiveId}/related${query ? `?${query}` : ""}`, {
		method: "GET",
	});
};

// List references specifically
export const listRelatedSpecify = (
	archiveId: UUID,
	related_entries_id: UUID,
) => {
	return apiFetch(`/archives/${archiveId}/related/${related_entries_id}`, {
		method: "GET",
	});
};

// Create a new related
export const createRelated = (archiveId: UUID, payload) => {
	return apiFetch(`/archives/${archiveId}/related`, {
		method: "POST",
		body: JSON.stringify(payload),
	});
};

// Update a related
export const updateRelated = (
	archiveId: UUID,
	related_entries_id: UUID,
	payload,
) => {
	return apiFetch(`/archives/${archiveId}/related/${related_entries_id}`, {
		method: "PUT",
		body: JSON.stringify(payload),
	});
};
// Delete a related
export const deleteRelated = (archiveId: UUID, related_entries_id: UUID) => {
	return apiFetch(`/archives/${archiveId}/related/${related_entries_id}`, {
		method: "DELETE",
	});
};
