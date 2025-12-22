export type ArchiveBase = {
    archives_id: string
    identifier: string
    base_folio: string
    folio: string
    name: string
    doc_type?: string
    year?: string
    storage_path?: string
    source_sheet?: string
    created_by: string
    created_by_name?: string
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

export type ColumnVisibility = {
    id: boolean
    identifier: boolean
    base: boolean
    folio: boolean
    name: boolean
    type: boolean
    year: boolean
    path: boolean
    sheet: boolean
    creator: boolean
    actions: boolean
}

