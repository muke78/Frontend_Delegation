import { FullScreenLoader } from '@/components/common/FullScreenLoader'
import { useAuthContext } from '@/context/useAuthContext'
import { Navigate, useLocation } from 'react-router-dom'

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
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

    return <>{children}</>
}