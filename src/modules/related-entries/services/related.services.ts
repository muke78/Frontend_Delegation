import type {
	CreateRelatedPayload,
	RelatedEntry,
	RelatedFormState,
	RelatedQueryParams,
	UpdateRelatedPayload,
} from "@/modules/related-entries/types.ts";
import { apiFetch } from "@/services/api/api";
import type {
	ApiSingleResponse,
	ApiSuccessResponse,
} from "@/services/api/types";
import type { UUID } from "@/types";

// List related query params
export const listRelated = (params?: RelatedQueryParams) => {
	const searchParams = new URLSearchParams();

	Object.entries(params ?? {}).forEach(([key, value]) => {
		if (value !== undefined && value !== "") {
			searchParams.append(key, String(value));
		}
	});

	const query = searchParams.toString();

	return apiFetch<ApiSuccessResponse<RelatedEntry>>(
		`/related${query ? `?${query}` : ""}`,
		{
			method: "GET",
		},
	);
};

// List references specifically
export const listRelatedSpecify = (
	archiveId: UUID,
	related_entries_id: UUID,
) => {
	return apiFetch<ApiSingleResponse<RelatedFormState>>(
		`/archives/${archiveId}/related/${related_entries_id}`,
		{
			method: "GET",
		},
	);
};

// Create a new related
export const createRelated = (
	archiveId: UUID,
	payload: CreateRelatedPayload,
) => {
	return apiFetch<ApiSuccessResponse>(`/archives/${archiveId}/related`, {
		method: "POST",
		body: JSON.stringify(payload),
	});
};

// Update a related
export const updateRelated = (
	archiveId: UUID,
	related_entries_id: UUID,
	payload: UpdateRelatedPayload,
) => {
	return apiFetch<ApiSuccessResponse>(
		`/archives/${archiveId}/related/${related_entries_id}`,
		{
			method: "PUT",
			body: JSON.stringify(payload),
		},
	);
};

// Delete a related
export const deleteRelated = (archiveId: UUID, related_entries_id: UUID) => {
	return apiFetch<ApiSuccessResponse>(
		`/archives/${archiveId}/related/${related_entries_id}`,
		{
			method: "DELETE",
		},
	);
};
