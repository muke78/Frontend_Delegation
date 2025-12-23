import { createContext } from 'react';
import type { ArchiveBase, ColumnVisibility, UUID } from '../types';
import type { Pagination } from '@/services/api/types';

export interface ArchiveContextType {
    archive: ArchiveBase[]
    loading: boolean
    paginationArchive?: Pagination
    columnVisibility: ColumnVisibility
    toggleColumn: (column: keyof ColumnVisibility) => void
    loadListArchive: () => void
    refresh: () => void
    handleDeleteArchive: (archiveId: UUID) => Promise<boolean>
    handleRebuildFolio: (archiveId: UUID) => Promise<boolean>
}

export const ArchiveContext = createContext<ArchiveContextType | null>(null)