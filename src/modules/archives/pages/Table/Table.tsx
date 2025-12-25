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
import { ArchiveActions } from "../components/ArchiveActions";
import { useArchiveContext } from "../../context/useArchiveContext";

import { CountLimit } from "../Filters/CountLimit";



export const TableApp = () => {
    const {
        archive,
        loading,
        paginationArchive,
        columnVisibility,
        handlePageChange,
    } = useArchiveContext()

    if (loading) return <FullScreenLoader message="Cargando..." />

    return (
        <div className="w-full space-y-4">
            <CountLimit />
            <div className="rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                {columnVisibility.id && (
                                    <TableHead className="w-[60px] font-semibold">#</TableHead>
                                )}
                                {columnVisibility.identifier && (
                                    <TableHead className="font-semibold min-w-[120px]">Identificador</TableHead>
                                )}
                                {columnVisibility.base && (
                                    <TableHead className="font-semibold min-w-[140px]">Base</TableHead>
                                )}
                                {columnVisibility.folio && (
                                    <TableHead className="font-semibold min-w-[130px]">Folio</TableHead>
                                )}
                                {columnVisibility.name && (
                                    <TableHead className="font-semibold min-w-[200px]">Nombre</TableHead>
                                )}
                                {columnVisibility.type && (
                                    <TableHead className="font-semibold">Tipo</TableHead>
                                )}
                                {columnVisibility.year && (
                                    <TableHead className="font-semibold">Año</TableHead>
                                )}
                                {columnVisibility.path && (
                                    <TableHead className="font-semibold min-w-[180px]">Ruta</TableHead>
                                )}
                                {columnVisibility.sheet && (
                                    <TableHead className="font-semibold">Hoja</TableHead>
                                )}
                                {columnVisibility.creator && (
                                    <TableHead className="font-semibold min-w-[150px]">Creado por</TableHead>
                                )}
                                {columnVisibility.actions && (
                                    <TableHead className="font-semibold text-right min-w-[200px]">Acciones</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {archive.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={Object.values(columnVisibility).filter(Boolean).length}
                                        className="h-32 text-center text-muted-foreground"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <Icons.FileText className="h-12 w-12 text-muted-foreground/40" />
                                            <div>
                                                <p className="font-medium">No se encontraron archivos</p>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Intenta ajustar los filtros o agrega un nuevo archivo
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                archive.map((arch, idx) => (
                                    <TableRow key={arch.archives_id} className="hover:bg-muted/30">
                                        {columnVisibility.id && (
                                            <TableCell className="font-medium text-muted-foreground">
                                                {idx + 1}
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
                                            <TableCell className="font-medium max-w-[300px] truncate" title={arch.name}>
                                                <div className="flex items-center gap-2">
                                                    <Icons.FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
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
                                            <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate font-mono" title={arch.storage_path}>
                                                {arch.storage_path}
                                            </TableCell>
                                        )}
                                        {columnVisibility.sheet && (
                                            <TableCell>{arch.source_sheet}</TableCell>
                                        )}
                                        {columnVisibility.creator && (
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
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
