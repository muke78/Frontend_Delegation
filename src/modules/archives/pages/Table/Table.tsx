import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FullScreenLoader } from "@/components/common/FullScreenLoader.tsx";
import { PagintationApp } from "@/components/layout/Pagination/Pagintation";

import { Icons } from "@/styles/Icons";
import { Badge } from "@/components/ui/badge";
import { ArchiveActions } from "@/modules/archives/pages/components/ArchiveActions.tsx";
import { useArchiveContext } from "@/modules/archives/context/useArchiveContext.ts"

import { CountLimit } from "@/modules/archives/pages/Filters/CountLimit.tsx";
import { getRowIndex } from "@/utils/archives/RangePagination";
import { NotFoundTable } from "@/modules/archives/pages/Table/NotFoundTable.tsx";



export const TableApp = () => {
    const {
        archive,
        loading,
        filters,
        paginationArchive,
        columnVisibility,
        handlePageChange,
        handleLimitChange
    } = useArchiveContext()

    if (loading) return <FullScreenLoader message="Cargando..." />

    return (
        <div className="w-full space-y-4">
            <CountLimit
                pagination={paginationArchive}
                limit={filters.limit}
                onLimitChange={handleLimitChange} />
            <div className="rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                {columnVisibility.id && (
                                    <TableHead className="w-15 font-semibold">#</TableHead>
                                )}
                                {columnVisibility.identifier && (
                                    <TableHead className="font-semibold min-w-30">Identificador</TableHead>
                                )}
                                {columnVisibility.base && (
                                    <TableHead className="font-semibold min-w-35">Base</TableHead>
                                )}
                                {columnVisibility.folio && (
                                    <TableHead className="font-semibold min-w-32.5">Folio</TableHead>
                                )}
                                {columnVisibility.name && (
                                    <TableHead className="font-semibold min-w-50">Nombre</TableHead>
                                )}
                                {columnVisibility.type && (
                                    <TableHead className="font-semibold">Tipo</TableHead>
                                )}
                                {columnVisibility.year && (
                                    <TableHead className="font-semibold">Año</TableHead>
                                )}
                                {columnVisibility.path && (
                                    <TableHead className="font-semibold min-w-45">Ruta</TableHead>
                                )}
                                {columnVisibility.sheet && (
                                    <TableHead className="font-semibold">Hoja</TableHead>
                                )}
                                {columnVisibility.creator && (
                                    <TableHead className="font-semibold min-w-37.5">Creado por</TableHead>
                                )}
                                {columnVisibility.actions && (
                                    <TableHead className="font-semibold text-right min-w-50">Acciones</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {archive.length === 0 ? (
                                <TableRow>
                                    <NotFoundTable
                                        spaceColSpan={Object.values(columnVisibility).filter(Boolean).length}
                                        subtitle="No se encontraron archivos"
                                        description=" Intenta ajustar los filtros o agrega un nuevo archivo" />
                                </TableRow>
                            ) : (
                                archive.map((arch, idx) => (
                                    <TableRow key={arch.archives_id} className="hover:bg-muted/30">
                                        {columnVisibility.id && (
                                            <TableCell className="font-medium text-muted-foreground">
                                                {paginationArchive && getRowIndex(paginationArchive, idx)}
                                            </TableCell>
                                        )}
                                        {columnVisibility.identifier && (
                                            <TableCell className="font-mono text-sm font-medium">
                                                {arch.identifier}
                                            </TableCell>
                                        )}
                                        {columnVisibility.base && (
                                            <TableCell className="font-mono text-sm">
                                                {arch.base_folio}
                                            </TableCell>
                                        )}
                                        {columnVisibility.folio && (
                                            <TableCell className="font-medium">{arch.folio}</TableCell>
                                        )}
                                        {columnVisibility.name && (
                                            <TableCell className="font-medium max-w-75 truncate" title={arch.name}>
                                                <div className="flex items-center gap-2">
                                                    <Icons.FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                                                    <span className="truncate">{arch.name}</span>
                                                </div>
                                            </TableCell>
                                        )}
                                        {columnVisibility.type && (
                                            <TableCell>
                                                <Badge variant={"secondary"} className="font-mono text-xs">
                                                    {arch.doc_type}
                                                </Badge>
                                            </TableCell>
                                        )}
                                        {columnVisibility.year && (
                                            <TableCell className="font-medium">{arch.year}</TableCell>
                                        )}
                                        {columnVisibility.path && (
                                            <TableCell className="text-xs text-muted-foreground max-w-50 truncate font-mono" title={arch.storage_path}>
                                                {arch.storage_path}
                                            </TableCell>
                                        )}
                                        {columnVisibility.sheet && (
                                            <TableCell>{arch.source_sheet}</TableCell>
                                        )}
                                        {columnVisibility.creator && (
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                        <span className="text-xs font-medium text-primary">
                                                            {arch.created_by_name?.charAt(0).toUpperCase() || '?'}
                                                        </span>
                                                    </div>
                                                    <span className="truncate">{arch.created_by_name}</span>
                                                </div>
                                            </TableCell>
                                        )}
                                        {columnVisibility.actions && (
                                            <TableCell>
                                                <ArchiveActions archive={arch} />
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {paginationArchive && (
                <div className="flex justify-center">
                    <PagintationApp pagination={paginationArchive} onPageChange={handlePageChange} />
                </div>
            )}
        </div>
    )
}
