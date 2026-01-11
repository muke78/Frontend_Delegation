import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import { AppRouter } from "@/app/AppRouter.tsx";
import { ThemeProvider } from "@/context/ThemeProvider.tsx";
import { ArchiveProvider } from "@/modules/archives/context/ArchiveProvider.tsx";
import { RelatedProvider } from "@/modules/related-entries/context/RelatedProvider.tsx";

import { Toaster } from "sonner";
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
