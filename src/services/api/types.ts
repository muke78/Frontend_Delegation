export interface Pagination {
    currentPage: number
    totalPages: number
    totalRecords: number
    recordsPerPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
}

export interface PaginatedData<T> {
    rows: T[]
    pagination: Pagination
}

export interface DuplexData<TArchive, TRelated> {
    archive: TArchive
    related: TRelated[]
}

export type ApiData<T = unknown, A = unknown, R = unknown> =
    | PaginatedData<T>
    | DuplexData<A, R>

export interface ApiSuccessResponse<
    T = unknown,
    A = unknown,
    R = unknown> {
    success: true | false
    data?: ApiData<T, A, R>
    message: string
    metadata: {
        timestamp: string,
        requestId: string,
        dataCount: number,
        dataCountFormatted: string
    }
}

export interface BackendFieldError {
  field: string
  message: string
}

export interface ApiValidationError {
    type: "validation"
    errors: BackendFieldError[]
}

export interface ApiGenericError {
    type: "error"
    message: string
}

export interface BackendValidationError {
    code: "VALIDATION"
    errores: { field: string; message: string }[]
}

export interface BackendGenericError {
    error?: { message?: string }
    message?: string
}

export type ApiError = ApiValidationError | ApiGenericError
