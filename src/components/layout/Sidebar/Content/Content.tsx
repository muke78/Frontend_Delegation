import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarItems } from "../Items/SidebarItems";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Content = ({ open }: { open: boolean }) => {
	const { pathname } = useLocation();

	return (
		<SidebarContent>
			<nav aria-label="Navegación principal">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{SidebarItems.map((item) => {
								const isActive = pathname === item.url;

								return (
									<SidebarMenuItem key={item.title}>
										<Tooltip>
											<TooltipTrigger asChild>
												<SidebarMenuButton
													asChild
													isActive={isActive}
													className={cn(
														"data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
														isActive
															? "bg-primary text-primary-foreground"
															: "hover:bg-sidebar-accent",
													)}
												>
													<NavLink
														to={item.url}
														end
														aria-label={item.title}
														className="flex items-center gap-2 w-full"
													>
														{item.icon}
														{open && <span>{item.title}</span>}
													</NavLink>
												</SidebarMenuButton>
											</TooltipTrigger>
											{!open && (
												<TooltipContent side="right" align="center">
													{item.tooltip || item.title}
												</TooltipContent>
											)}
										</Tooltip>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</nav>
		</SidebarContent>
	);
};
