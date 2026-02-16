import { createContext, type Dispatch, type SetStateAction } from "react";
import type {
	ArchiveBase,
	ArchiveFilters,
	ColumnVisibility,
	FormState,
} from "@/modules/archives/types.ts";
import type { Pagination } from "@/services/api/types.ts";
import type { SelectType, UUID } from "@/types";

export interface ArchiveContextType {
	archive: ArchiveBase[];
	archiveSelect: SelectType[];
	loading: boolean;
	paginationArchive?: Pagination;
	columnVisibility: ColumnVisibility;
	openDialog: boolean;
	formCreate: FormState;
	filters: ArchiveFilters;
	hasActiveFilters: boolean;
	setOpenDialog: Dispatch<SetStateAction<boolean>>;
	setFormCreate: Dispatch<SetStateAction<FormState>>;
	setFilters: Dispatch<SetStateAction<ArchiveFilters>>;
	toggleColumn: (column: keyof ColumnVisibility) => void;
	setAllColumns: (value: boolean) => void;
	loadListArchive: (filters: ArchiveFilters) => Promise<void>;
	refreshArchive: () => void;
	handleSubmitCreate: () => Promise<void>;
	handleDeleteArchive: (archiveId: UUID) => Promise<boolean>;
	handleRebuildFolio: (archiveId: UUID) => Promise<boolean>;
	handlePageChange: (page: number) => void;
	handleLimitChange: (limit: number) => void;
	clearFilters: () => void;
}

export const ArchiveContext = createContext<ArchiveContextType | null>(null);
