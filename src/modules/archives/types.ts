import type { metaData, Pagination } from "@/services/api/types";
import type { UUID } from "@/types.ts";

export type ArchiveBase = {
	archives_id: string;
	identifier: string;
	base_folio: string;
	folio: string;
	name: string;
	doc_type: string;
	year: string;
	storage_path: string;
	source_sheet: string;
	created_by?: string;
	created_by_name?: string;
};

export type CreateArchivePayload = Omit<
	ArchiveBase,
	"archives_id" | "folio" | "created_by_name"
>;

export type UpdateArchivePayload = Partial<ArchiveBase>;

export type FormState = Omit<
	ArchiveBase,
	"archives_id" | "folio" | "created_by" | "created_by_name"
>;

type ArchiveFilterFields =
	| "identifier"
	| "base_folio"
	| "name"
	| "doc_type"
	| "year"
	| "created_by";

export type ArchiveFilters = Partial<Pick<ArchiveBase, ArchiveFilterFields>> & {
	limit: string;
	page: string;
};

export type ArchiveDialogRelatedDuplex = {
	r_limit: string;
	r_page: string;
};

export type ArchiveDuplexQuery = {
	page?: string;
	limit?: string;
};

export type ColumnVisibility = {
	id: boolean;
	identifier: boolean;
	base: boolean;
	folio: boolean;
	name: boolean;
	type: boolean;
	year: boolean;
	path: boolean;
	sheet: boolean;
	creator: boolean;
	actions: boolean;
};

export type ArchiveActionsType = {
	open: boolean;
	archiveId: UUID;
	archiveName?: string;
	onClose: () => void;
};

export type ArchiveDuplex = {
	open: boolean;
	archiveId: UUID;
};

export interface DuplexResponse<A, R> {
	archive: A;
	related: R[];
	pagination: Pagination;
}

export interface ApiDuplexSuccessResponse<A, R> {
	success: boolean;
	data: DuplexResponse<A, R>;
	message: string;
	metadata: metaData;
}
