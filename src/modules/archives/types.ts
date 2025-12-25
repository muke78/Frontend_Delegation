export type ArchiveBase = {
    archives_id: string
    identifier: string
    base_folio: string
    folio: string
    name: string
    doc_type: string
    year: string
    storage_path: string
    source_sheet: string
    created_by?: string
    created_by_name?: string
}

export interface RelatedEntry {
    related_entries_id: string
    archive_id: string
    reference_number: number
    reference_folio: string
    description: string
    event_date: string 
    responsible_person: string
    responsible_role: string
    notas: string
    created: string 
    updated: string 
}


export type CreateArchivePayload = Omit<ArchiveBase, 'archives_id' | 'folio' | 'created_by_name'>

export type UpdateArchivePayload = Partial<ArchiveBase>

export type FormState = Omit<ArchiveBase, 'archives_id' | 'folio' | 'created_by' | 'created_by_name'>

type ArchiveFilterFields =
    | 'identifier'
    | 'base_folio'
    | 'name'
    | 'doc_type'
    | 'year'
    | 'created_by'


export type ArchiveFilters = Partial<Pick<ArchiveBase, ArchiveFilterFields>> & {
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

export type ArchiveActions = {
    open: boolean
    archiveId: UUID
    archiveName: string
    onClose: () => void
}


