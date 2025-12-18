import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "@/modules/auth/pages/LoginPage"
import { Home } from "@/modules/dashboard/pages/Home"
import { PrivateRoute } from "@/app/PrivateRoute.tsx"
import { PublicRoute } from "@/app/PublicRoute.tsx"
import { RegisterPage } from "@/modules/auth/pages/RegisterPage.tsx"
import { NotFound } from "@/components/layout/NotFound/NotFound"
import { RecoverPassword } from "@/modules/auth/pages/RecoverPassword"
import { Archives } from "@/modules/archives/pages/Archives"
import { RelatedEntries } from "@/modules/related-entries/pages/RelatedEntries"

import { Config } from "@/modules/config/pages/Config"
import { Users } from "@/modules/users/pages/Users"

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
                path="/home"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />

            <Route
                path="/archives"
                element={
                    <PrivateRoute>
                        <Archives />
                    </PrivateRoute>
                }
            />

            <Route
                path="/related-entries"
                element={
                    <PrivateRoute>
                        <RelatedEntries />
                    </PrivateRoute>
                }
            />

            <Route
                path="/users"
                element={
                    <PrivateRoute>
                        <Users />
                    </PrivateRoute>
                }
            />


            <Route
                path="/config"
                element={
                    <PrivateRoute>
                        <Config />
                    </PrivateRoute>
                }
            />

            <Route path="/" element={<Navigate to="/login" replace={true} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
