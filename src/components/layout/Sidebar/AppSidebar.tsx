import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    useSidebar,
    SidebarHeader,
} from "@/components/ui/sidebar"

import { useEffect, useState } from "react";
import { MenuItems } from './MenuItems.tsx';
import { Link, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.tsx';
import { Icons } from "@/styles/Icons.ts";
import { useAuthContext } from "@/context/useAuthContext.ts";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";
import clsx from "clsx";



export const AppSidebar = () => {
    const navigate = useNavigate()
    const [loggingOut, setLoggingOut] = useState(false)
    const { open } = useSidebar();
    const { user, logout } = useAuthContext();

    const handleLogout = async () => {
        if (loggingOut) return;

        setLoggingOut(true)

        try {
            const message = await logout()
            toast.success(message || 'Sesión cerrada correctamente')
        } catch (error) {
            toast.error("Error al cerrar sesión, pero se limpiará la sesión local")
        } finally {
            // ✅ SIEMPRE redirigir, incluso si hay error
            setLoggingOut(false)
            navigate("/login", { replace: true })
        }
    }

    useEffect(() => {
        localStorage.setItem("sidebar_state", String(open))
    }, [open])

    return (
        <Sidebar variant="inset" collapsible="icon" className="p-1">
            <SidebarHeader>
                <header
                    className="flex p-2"
                    aria-label="Título de la aplicación"
                >
                    <div className="flex items-center gap-2">
                        <Icons.FileText size={22} className="text-primary" />
                        {open && (
                            <h1 className="text-sm font-semibold whitespace-nowrap">
                                Control de archivos
                            </h1>
                        )}
                    </div>
                </header>
            </SidebarHeader>
            <hr />

            <SidebarContent>
                <nav aria-label="Navegación principal">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {MenuItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                to={item.url}
                                                aria-label={item.title}
                                            >
                                                {item.icon}
                                                <span className={clsx(!open && "sr-only")}>
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </nav>
            </SidebarContent>

            <hr />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    aria-haspopup="menu"
                                    aria-expanded={open}
                                >
                                    <Icons.User2 />
                                    {open && <span>{user?.username}</span>}
                                    <Icons.ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                side="top"
                                align="start"
                                className={clsx(
                                    "min-w-[180px]",
                                    open
                                        ? "w-[var(--radix-popper-anchor-width)]"
                                        : "w-auto"
                                )}
                            >
                                <DropdownMenuItem asChild>
                                    <Link
                                        to="/config"
                                        className="flex items-center gap-2 w-full"
                                    >
                                        <Icons.Settings />
                                        <span>Configuración</span>
                                    </Link>
                                </DropdownMenuItem>
                                <hr className="mt-1 mb-1" />
                                <DropdownMenuItem>
                                    <Button
                                        onClick={handleLogout}
                                        variant="destructive"
                                        size="sm"
                                        disabled={loggingOut}
                                        aria-busy={loggingOut}
                                        className="w-full flex gap-2"
                                    >
                                        <Icons.LogOut color="#fff" />
                                        {loggingOut
                                            ? "Cerrando sesión…"
                                            : "Cerrar sesión"}
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

        </Sidebar>
    )
}