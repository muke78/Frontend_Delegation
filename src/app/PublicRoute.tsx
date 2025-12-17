import { useAuthContext } from "@/context/useAuthContext"
import { Navigate, useLocation } from "react-router-dom"


export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuthContext()
    const location = useLocation()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Cargando...</p>
                </div>
            </div>
        )
    }

    if (isAuthenticated) {

        const from = (location.state)?.from?.pathname || '/dashboard'
        return <Navigate to={from} replace />
    }

    return <>{children}</>
}