import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FullScreenLoader } from "@/components/common/FullScreenLoader.tsx";
import { useArchive } from "@/modules/archives/hooks/useArchive.ts";
import { PagintationApp } from "@/components/layout/Pagination/Pagintation";


export const TableApp = () => {
    const { archive, loading, paginationArchive } = useArchive()

    if (loading) return <FullScreenLoader message="Cargando..." />

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Identificador</TableHead>
                        <TableHead>Base</TableHead>
                        <TableHead>Folio</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Año</TableHead>
                        <TableHead>Ruta</TableHead>
                        <TableHead>Hoja</TableHead>
                        <TableHead>Creado por</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {archive.map((arch, idx) => (
                        <TableRow key={arch.archives_id}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>{arch.identifier}</TableCell>
                            <TableCell>{arch.base_folio}</TableCell>
                            <TableCell>{arch.folio}</TableCell>
                            <TableCell>{arch.name}</TableCell>
                            <TableCell>{arch.doc_type}</TableCell>
                            <TableCell>{arch.year}</TableCell>
                            <TableCell>{arch.storage_path}</TableCell>
                            <TableCell>{arch.source_sheet}</TableCell>
                            <TableCell>{arch.created_by_name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {paginationArchive && (
                <PagintationApp
                    pagination={paginationArchive}
                />
            )}
        </>

    )
}
