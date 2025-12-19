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
import { Layout } from "@/components/layout/Layout"

export const AppRouter = () => {
    return (
        <Routes>
            {/* Rutas publicas */}
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/recovery" element={<RecoverPassword />} />
            </Route>



            {/* Rutas Privadas */}
            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/archives" element={<Archives />} />
                    <Route path="/related-entries" element={<RelatedEntries />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/config" element={<Config />} />
                </Route>
            </Route>


            <Route path="/" element={<Navigate to="/login" replace={true} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
