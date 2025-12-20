import { TableApp } from "./Table/Table"

export const Archives = () => {
  return (
    <div className="min-h-screen m-4">
      {/* Filtros */}
      <div>Filters</div>

      {/* Tabla de archivos */}
      <TableApp />

    </div>
  )
}
