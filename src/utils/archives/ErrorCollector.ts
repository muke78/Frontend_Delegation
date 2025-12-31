import type { ApiError } from "@/services/api/types"
import { useCallback } from "react"
import { toast } from "sonner"

export const ErrorCollector = () => {
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

    return {
        handleApiError
    }
};
