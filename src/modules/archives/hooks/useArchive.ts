import { useEffect, useState } from "react"
import type { ArchiveBase, UUID } from "../types"
import { listArchives, deleteArchive, rebuildFolio } from "@/modules/archives/services/archive.services.ts"
import type { ApiError, Pagination } from "@/services/api/types"
import { toast } from "sonner"

export const useArchive = () => {
    const [archive, setArchive] = useState<ArchiveBase[]>([])
    const [paginationArchive, setPaginationArchive] = useState<Pagination>()
    const [loading, setLoading] = useState(true)

    const [columnVisibility, setColumnVisibility] = useState({
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
    })

    const toggleColumn = (column: keyof typeof columnVisibility) => {
        setColumnVisibility(prev => ({
            ...prev,
            [column]: !prev[column]
        }))
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
        } finally {
            setLoading(false)
        }
    }

    const refresh = async () => {
        await loadListArchive()
    }

    const handleDeleteArchive = async (archiveId: UUID): Promise<boolean> => {
        try {
            const res = await deleteArchive(archiveId)
            toast.success(res.message)
            setArchive(prev => prev.filter(a => a.archives_id !== archiveId))
            return true
        } catch (error) {
            const err = error as ApiError

            if (err.type === "validation") {
                err.messages.forEach(msg => toast.error(msg))
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

            if (err.type === "error") {
                toast.info(err.message)
                return false
            }

            toast.error(err.messages)
            return false
        }
    }

    useEffect(() => {
        loadListArchive()
    }, [])

    return {
        archive,
        loading,
        paginationArchive,
        columnVisibility,
        toggleColumn,
        loadListArchive,
        refresh,
        handleRebuildFolio,
        handleDeleteArchive,
    }
}
