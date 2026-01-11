import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/styles/Icons";

type PropsClearFiltersType = {
	clearFilters: () => void;
	hasActiveFilters: boolean;
};

export const ClearFilters = ({
	clearFilters,
	hasActiveFilters,
}: PropsClearFiltersType) => {
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
