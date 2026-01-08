type ISODateString = string;

export interface RelatedEntry {
	related_entries_id: string;
	archive_id: string;
	reference_number: number;
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

export type CreateRelatedPayload = Omit<
	RelatedEntry,
	| "related_entries_id"
	| "archive_id"
	| "reference_number"
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
