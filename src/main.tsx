/** biome-ignore-all lint/style/noNonNullAssertion: <> */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AppRouter } from "@/app/AppRouter.tsx";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider.tsx";
import { ArchiveProvider } from "@/modules/archives/context/ArchiveProvider.tsx";
import { RelatedProvider } from "@/modules/related-entries/context/RelatedProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<RelatedProvider>
					<ArchiveProvider>
						<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
							<AppRouter />
							<Toaster closeButton expand richColors position="bottom-right" />
						</ThemeProvider>
					</ArchiveProvider>
				</RelatedProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
);
