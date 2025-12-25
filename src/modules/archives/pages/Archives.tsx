import { TableApp } from "./Table/Table"
import { CreateArchiveDialog } from "./Dialog/CreateArchiveDialog"
import { FiltersApp } from "./Filters/Filters"
import { ColumnsApp } from "./Filters/Columns"
import { ArchiveProvider } from "../context/ArchiveProvider"
import { ClearFilters } from "./Filters/ClearFilters"
import { ExportFile } from "./Builder/ExportFile"


export const Archives = () => {
  return (
    <ArchiveProvider >
      <div className="space-y-0">
        {/* Sección de Filtros */}
        <section className="rounded-t-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold">
              Filtros de búsqueda
            </h2>

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
    </ArchiveProvider>

  )
}