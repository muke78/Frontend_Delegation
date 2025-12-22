import { Button } from "@/components/ui/button";
import { Icons } from "@/styles/Icons";
import { useState } from "react";
import { DeleteArchiveDialog } from "../Dialog/DeleteArchiveDialog";
import type { ArchiveBase } from "../../types";
import { EditArchiveDialog } from "../Dialog/EditArchiveDialog";
import { ViewArchiveDialog } from "../Dialog/ViewArchiveDialog";
import { useArchiveContext } from "../../context/useArchiveContext";


export const ArchiveActions = ({ archive }: { archive: ArchiveBase }) => {
    const { handleRebuildFolio } = useArchiveContext()
    const [action, setAction] = useState<"view" | "edit" | "delete" | null>(null)

    return (
        <>
            <div className="flex items-center justify-end gap-1">

                <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-1.5 cursor-pointer hover:bg-blue-50 hover:text-blue-600"
                    title="Ver detalles"
                    onClick={() => setAction("view")}
                >
                    <Icons.Eye className="h-3.5 w-3.5" />
                    <span className="hidden xl:inline">Ver</span>
                </Button>

                <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-1.5 cursor-pointer hover:bg-amber-50 hover:text-amber-600"
                    title="Editar archivo"
                    onClick={() => setAction("edit")}
                >
                    <Icons.Pencil className="h-3.5 w-3.5" />
                    <span className="hidden xl:inline">Editar</span>
                </Button>

                <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-1.5 cursor-pointer hover:bg-emerald-50 hover:text-emerald-600"
                    title="Reconstruir folio"
                    onClick={() => handleRebuildFolio(archive.archives_id)}
                >
                    <Icons.Blocks className="h-3.5 w-3.5" />
                    <span className="hidden xl:inline">Reconstruir folio</span>
                </Button>

                <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-1.5 cursor-pointer text-destructive hover:bg-destructive/10"
                    title="Eliminar archivo"
                    onClick={() => setAction("delete")}
                >
                    <Icons.Trash2 className="h-3.5 w-3.5" />
                    <span className="hidden xl:inline">Eliminar</span>
                </Button>
            </div>

            <ViewArchiveDialog
                open={action === "view"}
                archiveId={archive.archives_id}
                archiveName={archive.name}
                onClose={() => setAction(null)}
            />

            <EditArchiveDialog
                open={action === "edit"}
                archiveId={archive.archives_id}
                onClose={() => setAction(null)}
            />

            <DeleteArchiveDialog
                open={action === "delete"}
                archiveId={archive.archives_id}
                archiveName={archive.name}
                onClose={() => setAction(null)}
            />

        </>


    )
}
