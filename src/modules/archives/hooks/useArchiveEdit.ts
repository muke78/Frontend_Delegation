import { useEffect, useState } from "react"
import { listArchivesById, updateArchive } from "@/modules/archives/services/archive.services.ts";
import type { ArchiveActionsType, FormState } from "@/modules/archives/types.ts";
import { DEFAULT_FORM_STATE } from "@/modules/archives/hooks/useEnviromentArchives.ts";
import { useArchiveContext } from "@/modules/archives/context/useArchiveContext.ts";
import { ErrorCollector } from "@/utils/archives/ErrorCollector";
import { toast } from "sonner"


export const useArchiveEdit = ({ archiveId, onClose, open }: ArchiveActionsType) => {

    const { refresh } = useArchiveContext()

    // Estados
    const [formEdit, setFormEdit] = useState<FormState>(DEFAULT_FORM_STATE)

    // Recolector de errores
    const { handleApiError } = ErrorCollector()

    // Funcion que manda a editar un archivo
    const handleSubmitEdit = async () => {
        try {

            const payload = {
                identifier: formEdit.identifier,
                base_folio: formEdit.base_folio,
                name: formEdit.name,
                doc_type: formEdit.doc_type,
                year: formEdit.year,
                source_sheet: formEdit.source_sheet,
                storage_path: formEdit.storage_path,
            }

            const res = await updateArchive(archiveId, payload)
            await refresh();
            toast.success(res.message)
            onClose()
        } catch (error) {
            handleApiError(error)
        }
    };

    // Efectos (Conseguir el registro que se le dio clic y sobnecargarlo al Dialog para editar)
    useEffect(() => {
        if (!open || !archiveId) return

        const getArchiveById = async () => {
            try {
                const res = await listArchivesById(archiveId)
                const archive = res.data[0]

                if (archive) {
                    setFormEdit({
                        identifier: archive.identifier ?? "",
                        base_folio: archive.base_folio ?? "",
                        name: archive.name ?? "",
                        doc_type: archive.doc_type ?? "",
                        year: archive.year?.toString() ?? "",
                        storage_path: archive.storage_path ?? "",
                        source_sheet: archive.source_sheet ?? ""
                    })
                } else {
                    toast.error(`No se encontró el archivo con ID ${archiveId}`)
                    onClose()
                }
            } catch (error) {

                handleApiError(error)

            }
        }

        getArchiveById()
    }, [archiveId, setFormEdit, onClose, open, handleApiError])


    return {
        formEdit,
        setFormEdit,
        handleSubmitEdit
    }
}
