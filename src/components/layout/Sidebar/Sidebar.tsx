import { useEffect } from "react";
import { Separator } from "@/components/ui/separator.tsx";
import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { Content } from "./Content/Content.tsx";
import { Footer } from "./Footer/Footer.tsx";
import { Header } from "./Header/Header.tsx";

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
