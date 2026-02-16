import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "@/app/PrivateRoute.tsx";
import { PublicRoute } from "@/app/PublicRoute.tsx";
import { Layout } from "@/components/layout/Layout.tsx";
import { NotFound } from "@/components/layout/NotFound/NotFound.tsx";
import { Archives } from "@/modules/archives/pages/Archives.tsx";
import { LoginPage } from "@/modules/auth/pages/LoginPage.tsx";
import { RecoverPassword } from "@/modules/auth/pages/RecoverPassword.tsx";
import { RegisterPage } from "@/modules/auth/pages/RegisterPage.tsx";
import { Config } from "@/modules/config/pages/Config.tsx";
import { Home } from "@/modules/dashboard/pages/Home.tsx";
import { RelatedEntries } from "@/modules/related-entries/pages/RelatedEntries.tsx";
import { Users } from "@/modules/users/pages/Users.tsx";

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
	);
};
