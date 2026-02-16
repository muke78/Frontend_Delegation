import { Icons } from "@/styles/Icons.ts";
import type { SidebarItem } from "./types.ts";

export const SidebarItems: SidebarItem[] = [
	{
		title: "Inicio",
		url: "/home",
		icon: <Icons.Home size={16} />,
		tooltip: "Inicio",
	},
	{
		title: "Archivos",
		url: "/archives",
		icon: <Icons.Archive size={16} />,
		tooltip: "Archivos",
	},
	{
		title: "Relaciones",
		url: "/related-entries",
		icon: <Icons.PackageOpen size={16} />,
		tooltip: "Relaciones",
	},
	{
		title: "Usuarios",
		url: "/users",
		icon: <Icons.User size={16} />,
		tooltip: "Usuarios",
	},
];
