import { ClearFilters } from "@/components/layout/Filters/ClearFilters.tsx";
import { useRelatedContext } from "@/modules/related-entries/context/useRelatedContext.ts";
import { CreateRelatedDialog } from "@/modules/related-entries/pages/Dialog/CreateRelatedDialog.tsx";
import { ColumnsApp as ColumnsAppRelated } from "@/modules/related-entries/pages/Filters/Columns.tsx";
import { FiltersApp } from "@/modules/related-entries/pages/Filters/Filters.tsx";
import { TableApp } from "@/modules/related-entries/pages/Table/Table.tsx";

export const RelatedEntries = () => {
	const { clearFilters, hasActiveFilters } = useRelatedContext();

	return (
		<div className="space-y-0 p-4">
			{/* Seccion de filtros */}
			<section className="rounded-t-lg border bg-card p-6 shadow-sm">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
					<h2 className="text-xl font-semibold">Filtros de búsqueda</h2>

					<div className="flex items-center gap-2">
						{/* Componmente de limpiar los filtros */}
						<ClearFilters
							clearFilters={clearFilters}
							hasActiveFilters={hasActiveFilters}
						/>
						{/* Dropdown para visibilidad de columnas */}
						<ColumnsAppRelated />
						{/* Modal para cargar archivos */}
						<CreateRelatedDialog />
					</div>
				</div>

				{/* Componente de filtros */}
				<FiltersApp />
			</section>

			{/* Seccion para la tabla */}
			<section className="rounded-b-lg border border-t-0 bg-card p-6 shadow-sm">
				<TableApp />
			</section>
		</div>
	);
};
