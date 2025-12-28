import { toast } from "sonner"
import type { ApiError } from "@/services/api/types"
import { useEffect, useState } from "react"
import { listArchivesById, updateArchive } from "../services/archive.services";
import type { ArchiveActionsType, FormState } from "../types";
import { DEFAULT_FORM_STATE } from "./useArchive";
import { useArchiveContext } from "../context/useArchiveContext";


export const useArchiveEdit = ({ archiveId, onClose, open }: ArchiveActionsType) => {

    const { refresh } = useArchiveContext()
    const [formEdit, setFormEdit] = useState<FormState>(DEFAULT_FORM_STATE)

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
            const err = error as ApiError

            if (err.type === "validation") {
                err.errors.forEach(e => {
                    toast.error(`${e.field}: ${e.message}`, {
                        duration: 10000,
                    })
                })
            } else {
                toast.error(err.message, { duration: 7000 })
            }
        }
    };

    useEffect(() => {
        if (!open || !archiveId) return

        const getArchiveById = async () => {
            try {
                const res = await listArchivesById(archiveId)
                const archive = res.data[0]
                toast.success(res.message)

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

                const err = error as ApiError

                if (err.type === "validation") {
                    err.errors.forEach(e => {
                        toast.error(`${e.field}: ${e.message}`, {
                            duration: 10000,
                        })
                    })
                } else {
                    toast.error(err.message, { duration: 7000 })
                }

            }
        }

        getArchiveById()
    }, [archiveId, setFormEdit, onClose, open])


    return {
        formEdit,
        setFormEdit,
        handleSubmitEdit
    }
}
