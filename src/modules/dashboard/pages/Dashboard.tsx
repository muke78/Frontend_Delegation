import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { useAuthContext } from '@/context/useAuthContext'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const Dashboard = () => {
    const { user, logout } = useAuthContext()
    const navigate = useNavigate()
    const [loggingOut, setLoggingOut] = useState(false)

    const handleLogout = async () => {
        if (loggingOut) return // ✅ Prevenir múltiples clicks

        setLoggingOut(true)
        
        try {
            const message = await logout()
            toast.success(message || 'Sesión cerrada correctamente')
        } catch (error) {
            toast.error("Error al cerrar sesión, pero se limpiará la sesión local")
        } finally {
            // ✅ SIEMPRE redirigir, incluso si hay error
            setLoggingOut(false)
            navigate("/login", { replace: true })
        }
    }

    // ✅ Protección extra: si no hay usuario, no renderizar nada
    if (!user) {
        return null
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Bienvenido usuario logeado</h1>

                <div className="space-y-2 mb-6">
                    <p><strong>Usuario:</strong> {user.username}</p>
                    <p><strong>Nombre:</strong> {user.full_name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Rol:</strong> {user.role}</p>
                    <p><strong>Último login:</strong> {new Date(user.last_login).toLocaleString()}</p>
                </div>

                <Button 
                    onClick={handleLogout} 
                    variant="destructive"
                    disabled={loggingOut}
                >
                    {loggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
                </Button>
            </div>
        </>
    )
}