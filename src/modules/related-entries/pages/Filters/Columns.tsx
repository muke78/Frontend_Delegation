import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRelatedContext } from "@/modules/related-entries/context/useRelatedContext.ts";
import { Icons } from "@/styles/Icons";

export const ColumnsApp = () => {
	const { toggleColumn, columnVisibility, setAllColumns } = useRelatedContext();

	type ColumnKey = keyof typeof columnVisibility;

	const columnLabels: Record<string, string> = {
		reference_folio: "Folio",
		reference_number: "Número de referencia",
		description: "Descripción",
		event_date: "Fecha del evento",
		responsible_person: "Persona responsable",
		responsible_role: "Persona a cargo",
		notas: "Notas",
		actions: "Acciones",
	};

	const allVisible = Object.values(columnVisibility).every(Boolean);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"outline"} className="gap-2 cursor-pointer">
					<Icons.Settings2 size={16} />
					Columnas
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-60">
				<DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => setAllColumns(!allVisible)}
					className="cursor-pointer font-medium"
				>
					<Icons.Columns size={16} />
					<span>
						{allVisible
							? "Ocultar todas las columnas"
							: "Mostrar todas las columnas"}
					</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				{(Object.entries(columnVisibility) as [ColumnKey, boolean][]).map(
					([column, visible]) => (
						<DropdownMenuCheckboxItem
							key={column}
							checked={visible}
							onCheckedChange={() => toggleColumn(column)}
						>
							{columnLabels[column]}
						</DropdownMenuCheckboxItem>
					),
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
