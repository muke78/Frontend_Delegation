import type { Pagination as PaginationType } from "@/services/api/types.ts"

export type PaginationAppProps = {
    pagination: PaginationType
    onPageChange?: (page: number) => void
}