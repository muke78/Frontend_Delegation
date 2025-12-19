import type { ReactNode } from "react";

export type SidebarItem = {
    title: string;
    url: string;
    icon: ReactNode;
    tooltip: string;
}