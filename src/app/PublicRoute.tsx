import { Navigate, Outlet, useLocation } from "react-router-dom"

import { FullScreenLoader } from "@/components/common/FullScreenLoader.tsx"
import { useAuthContext } from "@/context/useAuthContext"


export const PublicRoute = () => {
    const { isAuthenticated, loading } = useAuthContext()
    const location = useLocation()

    if (loading) {
        return (
            <FullScreenLoader message="Cargando..." />
        )
    }

    if (isAuthenticated) {

        const from = (location.state)?.from?.pathname || '/home'
        return <Navigate to={from} replace />
    }

    return <Outlet />

}