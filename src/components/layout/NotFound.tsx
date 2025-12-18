import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/context/useAuthContext"
import { Button } from "@/components/ui/button"
import { Icons } from '@/styles/Icons.ts';

import { useEffect, useState } from "react"

export const NotFound = () => {
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useAuthContext()
  const [countdown, setCountdown] = useState(10)


  const redirectPath = isAuthenticated ? "/dashboard" : "/login"
  const redirectText = isAuthenticated ? "Dashboard" : "Inicio de sesión"

  useEffect(() => {
    if (loading) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate(redirectPath, { replace: true })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate, redirectPath, loading])

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleGoHome = () => {
    navigate(redirectPath, { replace: true })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 px-4">
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/25 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative max-w-2xl w-full">
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border rounded-2xl shadow-2xl p-12 text-center space-y-8">
          {/* Icono animado */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative p-6 bg-primary/10 rounded-full">
                <Icons.FileQuestion size={80} className="text-primary" />
              </div>
            </div>
          </div>

          {/* Texto principal */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">
              Página no encontrada
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>

          {/* Contador de redirección */}
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Serás redirigido a <span className="font-semibold text-foreground">{redirectText}</span> en{" "}
              <span className="font-bold text-primary text-lg">{countdown}</span> segundo{countdown !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Icons.ArrowLeft size={16} className="mr-2" />
              Volver atrás
            </Button>
            <Button
              onClick={handleGoHome}
              className="w-full sm:w-auto"
            >
              <Icons.Home size={16} className="mr-2" />
              Ir a {redirectText}
            </Button>
          </div>
        </div>
      </div>
    </div >
  )
}