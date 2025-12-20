import { useEffect, useState } from "react"
import type { ArchiveBase } from "../types"
import { listArchives } from "@/modules/archives/services/archive.services.ts"
import type { Pagination } from "@/services/api/types"

export const useArchive = () => {
    const [archive, setArchive] = useState<ArchiveBase[]>([])
    const [paginationArchive, setPaginationArchive] = useState<Pagination>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadListArchive = async () => {
            try {
                const res = await listArchives()

                if (res.data && 'rows' in res.data) {
                    setArchive(res.data.rows)
                    setPaginationArchive(res.data.pagination)
                    console.log(res.data.pagination)
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

        loadListArchive()
    }, [])



    return {
        archive,
        loading,
        paginationArchive
    }
}
