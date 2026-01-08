import { createContext, type Dispatch, type SetStateAction } from "react";
import type {
	ColumnVisibilityRelated,
	CreateRelatedPayload,
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
	formCreate: CreateRelatedPayload;
	filters: RelatedQueryParams;
	setOpenDialog: Dispatch<SetStateAction<boolean>>;
	setFormCreate: Dispatch<SetStateAction<CreateRelatedPayload>>;
	setFilters: Dispatch<SetStateAction<RelatedQueryParams>>;
	toggleColumn: (column: keyof ColumnVisibilityRelated) => void;
	loadListRelated: (filters: RelatedQueryParams) => Promise<void>;
	refresh: () => void;

	handlePageChange: (page: number) => void;
	handleLimitChange: (limit: number) => void;
}

export const RelatedContext = createContext<RelatedContextType | null>(null);
