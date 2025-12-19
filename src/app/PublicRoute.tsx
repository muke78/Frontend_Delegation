import { FullScreenLoader } from "@/components/common/FullScreenLoader"
import { useAuthContext } from "@/context/useAuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"


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