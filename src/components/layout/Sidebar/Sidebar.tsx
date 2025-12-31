import { Sidebar, useSidebar } from "@/components/ui/sidebar";

import { useEffect } from "react";
import { Footer } from "./Footer/Footer.tsx";
import { Header } from "./Header/Header.tsx";
import { Content } from "./Content/Content.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export const AppSidebar = () => {
	const { open } = useSidebar();

	useEffect(() => {
		localStorage.setItem("sidebar_state", String(open));
	}, [open]);

	return (
		<Sidebar variant="inset" collapsible="icon">
			<Header open={open} />

			<Separator orientation="horizontal" />

			<Content open={open} />

			<Separator orientation="horizontal" />

			<Footer open={open} />
		</Sidebar>
	);
};
