import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import { AuthProvider } from "@/context/AuthProvider.tsx";
import { AppRouter } from "@/app/AppRouter.tsx";
import { ThemeProvider } from "./context/ThemeProvider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<AppRouter />
					<Toaster closeButton expand richColors position="bottom-right" />
				</ThemeProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
);
