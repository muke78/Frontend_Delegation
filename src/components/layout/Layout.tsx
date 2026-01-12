import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/layout/Sidebar/Sidebar.tsx";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar.tsx";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

export const Layout = () => {
	const [defaultOpen] = useState<boolean>(() => {
		const stored = localStorage.getItem("sidebar_state");
		return stored === null ? true : stored === "true";
	});

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<SidebarInset>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<SidebarTrigger
							className="m-2 size-9 [&_svg]:size-5 cursor-e-resize"
							aria-label="Abrir o cerrar sidebar"
						/>
					</TooltipTrigger>

					<TooltipContent side="right" align="center">
						<div className="flex flex-col gap-1">
							<span>Abrir / Cerrar sidebar</span>
							<span className="text-xs text-muted-foreground">Ctrl + B</span>
						</div>
					</TooltipContent>
				</Tooltip>

				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
};
