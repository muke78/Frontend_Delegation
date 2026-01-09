import { TableApp } from "@/modules/archives/pages/Table/Table.tsx";
import { CreateArchiveDialog } from "@/modules/archives/pages/Dialog/CreateArchiveDialog.tsx";
import { FiltersApp } from "@/modules/archives/pages/Filters/Filters.tsx";
import { ColumnsApp as ColumnsAppArchive } from "@/modules/archives/pages/Filters/Columns.tsx";
import { ClearFilters } from "@/components/layout/Filters/ClearFilters.tsx";
import { ExportFile } from "@/modules/archives/pages/Builder/ExportFile.tsx";
import { useArchiveContext } from "@/modules/archives/context/useArchiveContext.ts";

export const Archives = () => {
	const { clearFilters, hasActiveFilters } = useArchiveContext();

	return (
		<div className="space-y-0 p-4">
			{/* Sección de Filtros */}
			<section className="rounded-t-lg border bg-card p-6 shadow-sm">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
					<h2 className="text-xl font-semibold">Filtros de búsqueda</h2>

					<div className="flex items-center gap-2">
						<ClearFilters
							clearFilters={clearFilters}
							hasActiveFilters={hasActiveFilters}
						/>
						{/* Dropdown para visibilidad de columnas */}
						<ColumnsAppArchive />
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
