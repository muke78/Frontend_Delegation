import { Icons } from "@/styles/Icons";
import { useArchiveContext } from "@/modules/archives/context/useArchiveContext.ts";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export const ClearFilters = () => {
	const { filters, setFilters } = useArchiveContext();

	const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
		const isControlKey = key === "page" || key === "limit";
		return !isControlKey && value !== "";
	});

	const clearFilters = () => {
		if (!hasActiveFilters) return;

		setFilters((prev) => ({
			...prev,
			identifier: "",
			base_folio: "",
			name: "",
			doc_type: "",
			year: "",
			created_by: "",
			page: "1",
		}));
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					type="button"
					className="cursor-pointer"
					variant={"secondary"}
					size={"icon"}
					onClick={clearFilters}
					disabled={!hasActiveFilters}
					aria-disabled={!hasActiveFilters}
					aria-label="Limpiar filtros"
				>
					<Icons.Eraser />
				</Button>
			</TooltipTrigger>
			<TooltipContent side="left" align="center">
				<p>Limpiar filtros</p>
			</TooltipContent>
		</Tooltip>
	);
};
