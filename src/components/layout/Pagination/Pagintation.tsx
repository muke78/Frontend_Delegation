import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import type { Pagination as PaginationType } from "@/services/api/types"
import clsx from "clsx"

interface PaginationAppProps {
    pagination: PaginationType
    onPageChange?: (page: number) => void
}

const getPaginationRange = (
    current: number,
    total: number,
    delta = 5
) => {

    if (total <= 1) {
        return total === 1 ? [1] : [];
    }

    const range: (number | "...")[] = []

    const left = Math.max(2, current - delta)
    const right = Math.min(total - 1, current + delta)

    range.push(1)

    if (left > 2) range.push("...")

    for (let i = left; i <= right; i++) {
        range.push(i)
    }

    if (right < total - 1) range.push("...")

    if (total > 1) range.push(total)

    return range
}

export const PagintationApp = ({ pagination, onPageChange }: PaginationAppProps) => {
    const {
        currentPage,
        totalPages,
        hasNextPage,
        hasPrevPage,
    } = pagination

    const pages = getPaginationRange(currentPage, totalPages)

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        aria-disabled={!hasPrevPage}
                        onClick={() => hasPrevPage && onPageChange?.(currentPage - 1)}
                        className={clsx(
                            "cursor-pointer",
                            !hasPrevPage && "pointer-events-none opacity-50"
                        )}
                    >
                        Anterior
                    </PaginationPrevious>
                </PaginationItem>

                {pages.map((page, idx) => (
                    <PaginationItem key={idx}>
                        {page === "..." ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink className="cursor-pointer"
                                isActive={page === currentPage}
                                onClick={() => onPageChange?.(page)}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        aria-disabled={!hasNextPage}
                        onClick={() => hasNextPage && onPageChange?.(currentPage + 1)}
                        className={clsx(
                            "cursor-pointer",
                            !hasNextPage && "pointer-events-none opacity-50"
                        )}
                    >
                        Siguiente
                    </PaginationNext>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}