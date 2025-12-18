import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    useSidebar
} from "@/components/ui/sidebar"

import { useEffect } from "react";
import { MenuItems } from './MenuItems.tsx';
import { Link } from "react-router-dom";


export function AppSidebar() {
    const { open } = useSidebar();

    useEffect(() => {
        localStorage.setItem("sidebar_state", String(open))
    }, [open])

    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Control de Archivos</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {MenuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                Footer
            </SidebarFooter>
        </Sidebar>
    )
}