import { useEffect, useState } from "react"
import type { ArchiveBase, ColumnVisibility, FormState, UUID } from "../types"
import { listArchives, deleteArchive, rebuildFolio, createArchive } from "@/modules/archives/services/archive.services.ts"
import type { ApiError, Pagination } from "@/services/api/types"
import { toast } from "sonner"
import { useAuthContext } from "@/context/useAuthContext"
export const useArchive = () => {
    const { user } = useAuthContext();

    const [archive, setArchive] = useState<ArchiveBase[]>([])
    const [paginationArchive, setPaginationArchive] = useState<Pagination>()
    const [loading, setLoading] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)

    const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(() => {
        const stored = localStorage.getItem("archive_columns_visibility")

        if (stored) {
            return JSON.parse(stored) as ColumnVisibility
        }

        return {
            id: true,
            identifier: true,
            base: true,
            folio: true,
            name: true,
            type: true,
            year: true,
            path: true,
            sheet: true,
            creator: true,
            actions: true,
        }
    })

    const [form, setForm] = useState<FormState>({
        identifier: "",
        base_folio: "",
        name: "",
        doc_type: "",
        year: "",
        storage_path: "",
        source_sheet: "",
    })

    const toggleColumn = (column: keyof typeof columnVisibility) => {
        setColumnVisibility(prev => ({ ...prev, [column]: !prev[column] }))
    }

    const loadListArchive = async () => {
        setLoading(true)
        try {
            const res = await listArchives()

            if (res.data && 'rows' in res.data) {
                setArchive(res.data.rows)
                setPaginationArchive(res.data.pagination)
            } else {
                setArchive([])
            }
        } catch (error) {
            console.error(error)
            setArchive([])
            setPaginationArchive(undefined)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmitCreate = async (): Promise<void> => {

        try {
            const res = await createArchive({
                identifier: form.identifier,
                base_folio: form.base_folio,
                name: form.name,
                doc_type: form.doc_type,
                year: form.year,
                source_sheet: form.source_sheet,
                storage_path: form.storage_path,
                created_by: user?.user_id,
            })
            await refresh();
            toast.success(res.message)
            setOpenDialog(false)
            setForm({
                identifier: "",
                base_folio: "DYCCDC2528",
                name: "",
                doc_type: "",
                year: "",
                storage_path: "",
                source_sheet: "",
            })
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


    const handleDeleteArchive = async (archiveId: UUID): Promise<boolean> => {
        try {
            const res = await deleteArchive(archiveId)
            toast.success(res.message)
            setArchive(prev => prev.filter(a => a.archives_id !== archiveId))
            return true
        } catch (error) {
            const err = error as ApiError

            if (err.type === "validation") {
                err.errors.forEach(msg => toast.error(msg.message))
            } else {
                toast.error(err.message)
            }
            await refresh()

            return false;
        }
    };

    const handleRebuildFolio = async (archiveId: UUID): Promise<boolean> => {
        try {
            const res = await rebuildFolio(archiveId)

            toast.success(res.message)
            await refresh()

            return true
        } catch (error) {
            const err = error as ApiError

            if (err.type === "validation") {
                err.errors.forEach(msg => toast.info(msg.message))
                return false
            } else {
                toast.info(err.message)
            }

            return false
        }
    }

    const refresh = async () => {
        await loadListArchive()
    }


    useEffect(() => {
        loadListArchive()
    }, [])


    useEffect(() => {
        localStorage.setItem(
            "archive_columns_visibility",
            JSON.stringify(columnVisibility)
        )
    }, [columnVisibility])




    return {
        archive,
        loading,
        paginationArchive,
        columnVisibility,
        openDialog,
        setOpenDialog,
        form,
        setForm,
        toggleColumn,
        loadListArchive,
        refresh,
        handleSubmitCreate,
        handleRebuildFolio,
        handleDeleteArchive,
    }
}
