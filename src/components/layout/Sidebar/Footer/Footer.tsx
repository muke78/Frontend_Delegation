import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu.tsx"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar.tsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx"
import { useAuthContext } from "@/context/useAuthContext.ts"
import { Icons } from "@/styles/Icons.ts"
import clsx from "clsx"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const Footer = ({ open }: { open: boolean }) => {
    const navigate = useNavigate()
    const [loggingOut, setLoggingOut] = useState(false)
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
            setLoggingOut(false)
            navigate("/login", { replace: true })
        }
    }

    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        aria-haspopup="menu"
                                        aria-expanded={open}
                                        aria-label={`Usuario ${user?.username ?? ''}`}
                                    >
                                        <Icons.User2 aria-hidden="true" />

                                        {open && <span>{user?.username}</span>}

                                        <Icons.ChevronUp aria-hidden="true" className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            {!open && (
                                <TooltipContent side="right" align="center">
                                    {user?.username}
                                </TooltipContent>
                            )}
                        </Tooltip>
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
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link
                                    to="/config"
                                    className="flex items-center gap-2 w-full"
                                >
                                    <Icons.Settings />
                                    <span>Configuración</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                variant="destructive"
                                onClick={handleLogout}
                                disabled={loggingOut}
                                aria-busy={loggingOut}
                                className="w-full flex gap-2 cursor-pointer"
                            >
                                <Icons.LogOut />
                                {loggingOut
                                    ? "Cerrando sesión…"
                                    : "Cerrar sesión"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}
