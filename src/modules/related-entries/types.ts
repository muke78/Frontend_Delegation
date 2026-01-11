import type { UUID } from "@/types";

type ISODateString = string;

export interface RelatedEntry {
	related_entries_id: UUID;
	archive_id: UUID;
	reference_number: number;
	reference_formatted: string;
	reference_folio: string;
	description: string;
	event_date: ISODateString;
	responsible_person: string;
	responsible_role: string;
	notas: string;
	created: ISODateString;
	updated: ISODateString;
}

export type RelatedQueryParams = {
	reference_folio?: string;
	description?: string;
	event_date?: string;
	responsible_person?: string;
	limit: string;
	page?: string;
};

export type CreateRelatedFormState = {
	archive_id: UUID;
	description: string;
	event_date: string;
	responsible_person: string;
	responsible_role: string;
	notas: string;
};

export type CreateRelatedPayload = Omit<
	RelatedEntry,
	| "related_entries_id"
	| "archive_id"
	| "reference_number"
	| "reference_formatted"
	| "reference_folio"
	| "created"
	| "updated"
>;

export type UpdateRelatedPayload = Partial<CreateRelatedPayload>;

export type ColumnVisibilityRelated = {
	reference_number: boolean;
	reference_folio: boolean;
	description: boolean;
	event_date: boolean;
	responsible_person: boolean;
	responsible_role: boolean;
	notas: boolean;
	actions: boolean;
};
