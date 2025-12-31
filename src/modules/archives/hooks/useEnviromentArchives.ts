import type { ColumnVisibility, FormState } from "@/modules/archives/types.ts"

// Constantes
export const DEFAULT_PAGE_LIMIT = 20
export const DEBOUNCE_DELAY = 500
export const STORAGE_KEY = "archive_columns_visibility"

// Visibilidad de columnas
export const DEFAULT_COLUMN_VISIBILITY: ColumnVisibility = {
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
}

// Estado por defecto de form
export const DEFAULT_FORM_STATE: FormState = {
    identifier: "",
    base_folio: "",
    name: "",
    doc_type: "",
    year: "",
    storage_path: "",
    source_sheet: "",
}