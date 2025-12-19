import { FullScreenLoader } from '@/components/common/FullScreenLoader'
import { useAuthContext } from '@/context/useAuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuthContext()
    const location = useLocation()

    if (loading) {
        return (
            <FullScreenLoader message='Verificando sesión...' />
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return <Outlet />
}