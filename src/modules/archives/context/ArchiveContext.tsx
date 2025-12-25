import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { ArchiveBase, ColumnVisibility, FormState, UUID } from '../types';
import type { Pagination } from '@/services/api/types';

export interface ArchiveContextType {
    archive: ArchiveBase[]
    loading: boolean
    paginationArchive?: Pagination
    columnVisibility: ColumnVisibility
    openDialog: boolean
    setOpenDialog: Dispatch<SetStateAction<boolean>>
    form: FormState
    setForm: Dispatch<SetStateAction<FormState>>
    toggleColumn: (column: keyof ColumnVisibility) => void
    loadListArchive: () => void
    refresh: () => void
    handleSubmitCreate: () => Promise<void>
    handleDeleteArchive: (archiveId: UUID) => Promise<boolean>
    handleRebuildFolio: (archiveId: UUID) => Promise<boolean>
}

export const ArchiveContext = createContext<ArchiveContextType | null>(null)