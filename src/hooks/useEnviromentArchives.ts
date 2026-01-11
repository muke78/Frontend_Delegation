import type { ColumnVisibility, FormState } from "@/modules/archives/types.ts";
import type {
	ColumnVisibilityRelated,
	CreateRelatedFormState
} from "@/modules/related-entries/types";

// Constantes
export const DEFAULT_PAGE_LIMIT = 20;
export const DEBOUNCE_DELAY = 500;

// Archivos
export const STORAGE_KEY_ARCHIVE = "archive_columns_visibility";

// Visibilidad de columnas
export const DEFAULT_COLUMN_VISIBILITY_ARCHIVE: ColumnVisibility = {
	id: true,
	identifier: true,
	base: true,
	folio: true,
	name: true,
	type: true,
	year: true,
	path: true,
	sheet: true,
	creator: true,
	actions: true,
};

// Estado por defecto de form archivos
export const DEFAULT_FORM_STATE_ARCHIVE: FormState = {
	identifier: "",
	base_folio: "",
	name: "",
	doc_type: "",
	year: "",
	storage_path: "",
	source_sheet: "",
};

// Related
export const STORAGE_KEY_RELATED = "related_columns_visibility";

// Visibilidad de columnas
export const DEFAULT_COLUMN_VISIBILITY_RELATED: ColumnVisibilityRelated = {
	reference_number: true,
	reference_folio: true,
	description: true,
	event_date: true,
	responsible_person: true,
	responsible_role: true,
	notas: true,
	actions: true,
};

// Estado por defecto de form relaciones
export const DEFAULT_FORM_STATE_RELATED: CreateRelatedFormState = {
	archive_id: "",
	description: "",
	event_date: "",
	responsible_person: "",
	responsible_role: "",
	notas: "",
};
