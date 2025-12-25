import { useCallback, useEffect, useRef, useState } from "react"
import type { ArchiveBase, ArchiveFilters, ColumnVisibility, FormState, UUID } from "../types"
import { listArchives, deleteArchive, rebuildFolio, createArchive } from "@/modules/archives/services/archive.services.ts"
import type { ApiError, Pagination } from "@/services/api/types"
import { toast } from "sonner"
import { useAuthContext } from "@/context/useAuthContext"
import { useNavigate } from 'react-router-dom';

// Constantes
const DEBOUNCE_DELAY = 500
const STORAGE_KEY = "archive_columns_visibility"
const DEFAULT_PAGE_LIMIT = 20

const DEFAULT_COLUMN_VISIBILITY: ColumnVisibility = {
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

const DEFAULT_FORM_STATE: FormState = {
    identifier: "",
    base_folio: "",
    name: "",
    doc_type: "",
    year: "",
    storage_path: "",
    source_sheet: "",
}

// Utilidades
const getStoredColumnVisibility = (): ColumnVisibility => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : DEFAULT_COLUMN_VISIBILITY
    } catch (error) {
        console.error("Error al parsear la visibilidad de las columnas:", error)
        return DEFAULT_COLUMN_VISIBILITY
    }
}

const getFiltersFromURL = (): ArchiveFilters => {
    const params = new URLSearchParams(window.location.search)

    return {
        identifier: params.get("identifier") || "",
        base_folio: params.get("base_folio") || "",
        name: params.get("name") || "",
        doc_type: params.get("doc_type") || "",
        year: params.get("year") || "",
        created_by: params.get("created_by") || "",
        limit: params.get("limit") || String(DEFAULT_PAGE_LIMIT),
        page: params.get("page") || "",
    }
}

const buildURLSearchParams = (filters: ArchiveFilters): URLSearchParams => {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            params.append(key, String(value))
        }
    })

    return params
}

const formatArchiveFilters = (filters: ArchiveFilters): ArchiveFilters => {
    const params = buildURLSearchParams(filters)
    return params.toString() as ArchiveFilters
}

export const useArchive = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const debounceTimeoutRef = useRef<number | null>(null)

    // Estado
    const [archive, setArchive] = useState<ArchiveBase[]>([])
    const [paginationArchive, setPaginationArchive] = useState<Pagination>()
    const [loading, setLoading] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(getStoredColumnVisibility)
    const [form, setForm] = useState<FormState>(DEFAULT_FORM_STATE)
    const [filters, setFilters] = useState<ArchiveFilters>(getFiltersFromURL)

    // Handlers de errores
    const handleApiError = useCallback((error: unknown) => {
        const err = error as ApiError

        if (err.type === "validation") {
            err.errors.forEach(e => {
                toast.error(`${e.field}: ${e.message}`, { duration: 10000 })
            })
        } else {
            toast.error(err.message, { duration: 7000 })
        }
    }, [])

    // Funciones de columnas
    const toggleColumn = useCallback((column: keyof ColumnVisibility) => {
        setColumnVisibility(prev => ({ ...prev, [column]: !prev[column] }))
    }, [])

    // Función de cambio de página
    const handlePageChange = useCallback((page: number) => {
        setFilters(prev => ({
            ...prev,
            page: String(page),
        }))

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    // Función para cambiar el límite de registros por página
    const handleLimitChange = useCallback((limit: number) => {
        setFilters(prev => ({
            ...prev,
            limit: String(limit),
            page: "1",
        }))
    }, [])

    // Funciones de API
    const loadListArchive = useCallback(async (queryParams: ArchiveFilters) => {
        try {
            setLoading(true)
            const res = await listArchives(queryParams)

            if (res.data && 'rows' in res.data) {
                setArchive(res.data.rows)
                setPaginationArchive(res.data.pagination)
            } else {
                setArchive([])
            }
        } catch (error) {
            handleApiError(error)
            setArchive([])
            setPaginationArchive(undefined)
        } finally {
            setLoading(false)
        }
    }, [handleApiError])

    const refresh = useCallback(async () => {
        const queryParams = formatArchiveFilters(filters)
        await loadListArchive(queryParams)
    }, [filters, loadListArchive])

    const handleSubmitCreate = useCallback(async (): Promise<void> => {
        try {
            const res = await createArchive({
                ...form,
                created_by: user?.user_id,
            })

            await refresh()
            toast.success(res.message)
            setOpenDialog(false)
            setForm(DEFAULT_FORM_STATE)
        } catch (error) {
            handleApiError(error)
        }
    }, [form, user?.user_id, refresh, handleApiError])


    const handleDeleteArchive = useCallback(async (archiveId: UUID): Promise<boolean> => {
        try {
            const res = await deleteArchive(archiveId)
            toast.success(res.message)
            setArchive(prev => prev.filter(a => a.archives_id !== archiveId))
            return true
        } catch (error) {
            handleApiError(error)
            await refresh()
            return false
        }
    }, [handleApiError, refresh])

    const handleRebuildFolio = useCallback(async (archiveId: UUID): Promise<boolean> => {
        try {
            const res = await rebuildFolio(archiveId)
            toast.success(res.message)
            await refresh()
            return true
        } catch (error) {
            const err = error as ApiError

            if (err.type === "validation") {
                err.errors.forEach(msg => toast.info(msg.message))
            } else {
                toast.info(err.message)
            }

            return false
        }
    }, [refresh])


    // Efectos
    useEffect(() => {
        const queryParams = formatArchiveFilters(filters)

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
        }

        debounceTimeoutRef.current = setTimeout(() => {
            loadListArchive(queryParams)
        }, DEBOUNCE_DELAY)

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current)
            }
        }
    }, [filters, loadListArchive])


    useEffect(() => {
        const params = buildURLSearchParams(filters)
        const newUrl = params.toString()
            ? `${window.location.pathname}?${params.toString()}`
            : window.location.pathname

        navigate(newUrl, { replace: true })
    }, [filters, navigate])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(columnVisibility))
    }, [columnVisibility])

    return {
        archive,
        loading,
        paginationArchive,
        columnVisibility,
        openDialog,
        form,
        filters,
        setOpenDialog,
        setForm,
        setFilters,
        toggleColumn,
        loadListArchive,
        refresh,
        handleSubmitCreate,
        handleRebuildFolio,
        handleDeleteArchive,
        handlePageChange,
        handleLimitChange,
    }
}
