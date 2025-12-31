import type { PaginationAppProps } from "@/components/types";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationRange } from "@/utils/archives/RangePagination.ts";
import clsx from "clsx";

export const PagintationApp = ({
	pagination,
	onPageChange,
}: PaginationAppProps) => {
	const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

	const pages = getPaginationRange(currentPage, totalPages);

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						aria-disabled={!hasPrevPage}
						onClick={() => hasPrevPage && onPageChange?.(currentPage - 1)}
						className={clsx(
							"cursor-pointer",
							!hasPrevPage && "pointer-events-none opacity-50",
						)}
					></PaginationPrevious>
				</PaginationItem>

				{pages.map((page, idx) => (
					<PaginationItem key={idx}>
						{page === "..." ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								className="cursor-pointer"
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
							!hasNextPage && "pointer-events-none opacity-50",
						)}
					></PaginationNext>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
