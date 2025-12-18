import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "@/modules/auth/pages/LoginPage"
import { Dashboard } from "@/modules/dashboard/pages/Dashboard"
import { PrivateRoute } from "@/app/PrivateRoute.tsx"
import { PublicRoute } from "@/app/PublicRoute.tsx"
import { RegisterPage } from "@/modules/auth/pages/RegisterPage.tsx"
import { NotFound } from "@/components/layout/NotFound"
import { RecoverPassword } from "@/components/layout/RecoverPassword"

export const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>
                }
            />

            <Route path="/recovery" element={
                <PublicRoute>
                    <RecoverPassword />
                </PublicRoute>
            } />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />

            <Route
                path="/archives"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />

            <Route
                path="/related-entries"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />


            <Route
                path="/config"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />

            <Route path="/" element={<Navigate to="/login" replace={true} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
