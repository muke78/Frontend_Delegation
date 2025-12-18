import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { v } from '@/styles/Icons.tsx';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

import { toast } from "sonner"
import type { ApiError } from "@/services/api/api.ts"
import { login } from "@/modules/auth/services/auth.services.ts"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "@/context/useAuthContext"
import { Checkbox } from "@/components/ui/checkbox";

export const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { refreshUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await login({ email, password })
      await refreshUser();
      toast.success(res.message)
      navigate("/dashboard", { replace: true })
    } catch (error) {
      const err = error as ApiError

      if (err.type === "validation") {
        err.messages.forEach(msg => toast.error(msg))
      } else {
        toast.error(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 px-4">
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/25 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md"
      >
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Header con icono */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <v.iconFileText size="32px" className="text-primary" />
            </div>
            <FieldSet>
              <FieldLegend className="text-2xl font-bold tracking-tight">
                Iniciar sesión
              </FieldLegend>
              <FieldDescription className="text-sm text-muted-foreground">
                Accede al sistema de gestión de archivos
              </FieldDescription>
            </FieldSet>
          </div>

          <FieldGroup className="space-y-1">
            {/* Email Field */}
            <Field>
              <FieldLabel className="text-sm font-medium">
                Correo electrónico
              </FieldLabel>
              <div className="relative">
                <v.iconMail size="16px" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@ejemplo.com"
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </Field>

            {/* Password Field */}
            <Field>
              <FieldLabel className="text-sm font-medium">
                Contraseña
              </FieldLabel>
              <div className="relative">
                <v.iconLock size="16px" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </Field>
            <div className="flex justify-between">
              <div className="flex justify-center items-center gap-2">
                <Checkbox id="show-password" onClick={() => setShowPassword(!showPassword)} />
                <Label htmlFor="show-password">Mostrar constraseña</Label>
              </div>
              <div>
                <Link to="/recovery">
                  <Button variant={"link"}>¿Olvidaste tu contraseña?</Button>
                </Link>
              </div>


            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-base font-medium"
            >
              {loading ? (
                <>
                  <v.iconLoader size="16px" className="mr-2 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </FieldGroup>

          <div className="flex justify-center items-center">
            <span>No tengo una cuenta.</span>
            <Link to="/register">
              <Button variant={"link"}>Registrate</Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
