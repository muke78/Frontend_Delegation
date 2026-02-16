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
import { useArchiveContext } from "@/modules/archives/context/useArchiveContext.ts";
import { Icons } from "@/styles/Icons";

export const ColumnsApp = () => {
	const { toggleColumn, columnVisibility, setAllColumns } = useArchiveContext();

	type ColumnKey = keyof typeof columnVisibility;

	const columnLabels: Record<string, string> = {
		id: "#",
		identifier: "Identificador",
		base: "Base",
		folio: "Folio",
		name: "Nombre",
		type: "Tipo",
		year: "Año",
		path: "Ruta",
		sheet: "Hoja",
		creator: "Creado por",
		actions: "Acciones",
	};

	const allVisible = Object.values(columnVisibility).every(Boolean);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="gap-2 cursor-pointer">
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
