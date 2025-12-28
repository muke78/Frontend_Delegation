import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { ArchiveBase, ArchiveFilters, ColumnVisibility, FormState, UUID } from '../types';
import type { Pagination } from '@/services/api/types';

export interface ArchiveContextType {
    archive: ArchiveBase[]
    loading: boolean
    paginationArchive?: Pagination
    columnVisibility: ColumnVisibility
    openDialog: boolean
    formCreate: FormState
    filters: ArchiveFilters
    setOpenDialog: Dispatch<SetStateAction<boolean>>
    setFormCreate: Dispatch<SetStateAction<FormState>>
    setFilters: Dispatch<SetStateAction<ArchiveFilters>>
    toggleColumn: (column: keyof ColumnVisibility) => void
    loadListArchive: (filters: ArchiveFilters) => Promise<void>
    refresh: () => void
    handleSubmitCreate: () => Promise<void>
    handleDeleteArchive: (archiveId: UUID) => Promise<boolean>
    handleRebuildFolio: (archiveId: UUID) => Promise<boolean>
    handlePageChange: (page: number) => void
    handleLimitChange: (limit: number) => void
}

export const ArchiveContext = createContext<ArchiveContextType | null>(null)