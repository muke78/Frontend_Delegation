import { TableApp } from "@/modules/archives/pages/Table/Table.tsx";
import { CreateArchiveDialog } from "@/modules/archives/pages/Dialog/CreateArchiveDialog.tsx";
import { FiltersApp } from "@/modules/archives/pages/Filters/Filters.tsx";
import { ColumnsApp } from "@/modules/archives/pages/Filters/Columns.tsx";
import { ClearFilters } from "@/modules/archives/pages/Filters/ClearFilters.tsx";
import { ExportFile } from "@/modules/archives/pages/Builder/ExportFile.tsx";

export const Archives = () => {
	return (
		<div className="space-y-0 p-4">
			{/* Sección de Filtros */}
			<section className="rounded-t-lg border bg-card p-6 shadow-sm">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
					<h2 className="text-xl font-semibold">Filtros de búsqueda</h2>

					<div className="flex items-center gap-2">
						<ClearFilters />
						{/* Dropdown para visibilidad de columnas */}
						<ColumnsApp />
						{/* Modal para cargar archivos */}
						<CreateArchiveDialog />

						<ExportFile />
					</div>
				</div>

				<FiltersApp />
			</section>

			{/* Sección de Tabla */}
			<section className="rounded-b-lg border border-t-0 bg-card p-6 shadow-sm">
				<TableApp />
			</section>
		</div>
	);
};
