export type ArchiveBase = {
    archives_id: string
    identifier: string
    base_folio: string
    folio: string
    name: string
    doc_type?: string
    year: string
    storage_path?: string
    source_sheet?: string
    created_by?: string
    created_by_name?: string
}

export interface RelatedEntry {
    related_entries_id: string
    archive_id: string
    reference_number: number
    reference_folio: string
    description: string
    event_date: string // viene como ISO string
    responsible_person: string
    responsible_role: string
    notas: string
    created: string // ISO string
    updated: string // ISO string
}


export type CreateArchivePayload = Omit<ArchiveBase, 'archives_id' | 'folio' | 'created_by_name'>

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

