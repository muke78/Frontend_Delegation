import { createContext, type Dispatch, type SetStateAction } from "react";
import type {
	ColumnVisibilityRelated,
	CreateRelatedFormState,
	RelatedEntry,
	RelatedQueryParams,
} from "@/modules/related-entries/types.ts";
import type { Pagination } from "@/services/api/types";

export interface RelatedContextType {
	related: RelatedEntry[];
	loading: boolean;
	paginationRelated?: Pagination;
	columnVisibility: ColumnVisibilityRelated;
	openDialog: boolean;
	formCreate: CreateRelatedFormState;
	filters: RelatedQueryParams;
	hasActiveFilters: boolean;
	setOpenDialog: Dispatch<SetStateAction<boolean>>;
	setFormCreate: Dispatch<SetStateAction<CreateRelatedFormState>>;
	setFilters: Dispatch<SetStateAction<RelatedQueryParams>>;
	toggleColumn: (column: keyof ColumnVisibilityRelated) => void;
	setAllColumns: (value: boolean) => void;
	loadListRelated: (filters: RelatedQueryParams) => Promise<void>;
	refreshRelated: () => void;
	handleSubmitCreate: () => Promise<void>;
	handlePageChange: (page: number) => void;
	handleLimitChange: (limit: number) => void;
	clearFilters: () => void;
}

export const RelatedContext = createContext<RelatedContextType | null>(null);
