import { Icons } from "@/styles/Icons.ts";
import type { SidebarItem } from "./types.ts";

export const SidebarItems: SidebarItem[] = [
    {
        title: "Inicio",
        url: "/home",
        icon: <Icons.Home />,
        tooltip: "Inicio"
    },
    {
        title: "Archivos",
        url: "/archives",
        icon: <Icons.Archive />,
        tooltip: "Archivos"
    },
    {
        title: "Relaciones",
        url: "/related-entries",
        icon: <Icons.PackageOpen />,
        tooltip: "Relaciones"
    },
    {
        title: "Usuarios",
        url: "/users",
        icon: <Icons.User />,
        tooltip: "Usuarios",
    },
]