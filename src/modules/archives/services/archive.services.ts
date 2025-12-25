import { apiFetch } from '@/services/api/api.ts';
import type { ApiSingleResponse, ApiSuccessResponse } from '@/services/api/types.ts';
import type { CreateArchivePayload, UpdateArchivePayload, ArchiveFilters, UUID, ArchiveBase, RelatedEntry } from '../types.ts';


export const listArchiveDuplex = (archiveId: UUID) => {
    return apiFetch<ApiSuccessResponse<never, ArchiveBase, RelatedEntry>>(`/archives/${archiveId}/duplex`, {
        method: "GET"
    })
}

// List archives query params
export const listArchives = (params?: ArchiveFilters) => {
    const searchParams = new URLSearchParams()

    Object.entries(params ?? {}).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            searchParams.append(key, String(value))
        }
    })

    const query = searchParams.toString()

    return apiFetch<ApiSuccessResponse<ArchiveBase>>(
        `/archives${query ? `?${query}` : ""}`,
        { method: "GET" }
    )
}

// List archives from uuid
export const listArchivesById = (archiveId: UUID) => {
    return apiFetch<ApiSingleResponse<ArchiveBase>>(`/archives/${archiveId}`, {
        method: "GET",
    })
};

// Parcial search folio AVE
export const searchFolio = (folio: string) => {
    return apiFetch<ApiSuccessResponse>(`/archives/search?folio=${folio}`, {
        method: "GET",
    })
};

// input complete folio AVEDYCCDC2528 (returns true or false)
export const validateFolio = (folio: string) => {
    return apiFetch<ApiSuccessResponse>(`/archives/validate-folio?folio=${folio}`, {
        method: "GET"
    })
}

// Create a new archive
export const createArchive = (payload: CreateArchivePayload) => {
    return apiFetch<ApiSuccessResponse>("/archives", {
        method: "POST",
        body: JSON.stringify(payload)
    })
};

// Upate archive
export const updateArchive = (archiveId: UUID, payload: UpdateArchivePayload) => {
    return apiFetch<ApiSuccessResponse>(`/archives/${archiveId}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    })
};

// Rebuild folio 
export const rebuildFolio = (archiveId: string) => {
    return apiFetch<ApiSuccessResponse>(`/archives/${archiveId}/regenerate-folio`, {
        method: "PUT"
    })
};

// Delete archive
export const deleteArchive = (archiveId: string) => {
    return apiFetch<ApiSuccessResponse>(`/archives/${archiveId}`, {
        method: "DELETE"
    })
};
