export type ArchiveBase = {
    identifier: string
    base_folio: string
    name: string
    doc_type?: string
    year?: string
    storage_path?: string
    source_sheet?: string
    created_by: string
}

export type CreateArchivePayload = ArchiveBase

export type UpdateArchivePayload = Partial<ArchiveBase>


export type ArchiveFilters = {
    identifier?: string
    base_folio?: string
    name?: string
    doc_type?: string
    year?: string
    created_by?: string
    limit?: number
    page?: number
}

export type UUID = string
