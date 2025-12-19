import { useAuthContext } from '@/context/useAuthContext'

export const Home = () => {
    const { user } = useAuthContext()

    // ✅ Protección extra: si no hay usuario, no renderizar nada
    if (!user) {
        return null
    }

    return (
        <>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Bienvenido usuario logeado</h1>

                <div className="space-y-2 mb-6">
                    <p><strong>Usuario:</strong> {user.username}</p>
                    <p><strong>Nombre:</strong> {user.full_name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Rol:</strong> {user.role}</p>
                    <p><strong>Último login:</strong> {new Date(user.last_login).toLocaleString()}</p>
                </div>
            </div>
        </>

    )
}