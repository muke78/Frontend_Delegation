import { Button } from "@/components/ui/button";
import { Icons } from "@/styles/Icons";
import { useArchiveContext } from "@/modules/archives/context/useArchiveContext.ts";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export const ClearFilters = () => {
	const { setFilters } = useArchiveContext();

	const clearFilters = () => {
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
					variant={"secondary"}
					size={"icon"}
					className="cursor-pointer"
					onClick={() => clearFilters()}
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
