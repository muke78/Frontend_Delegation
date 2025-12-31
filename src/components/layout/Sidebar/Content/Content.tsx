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
import { Link } from "react-router-dom";

export const Content = ({ open }: { open: boolean }) => {
	return (
		<SidebarContent>
			<nav aria-label="Navegación principal">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{SidebarItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<Tooltip>
										<TooltipTrigger>
											<SidebarMenuButton asChild>
												<Link to={item.url} aria-label={item.title}>
													{item.icon}
													{open && <span>{item.title}</span>}
													{!open && <span>{item.title}</span>}
												</Link>
											</SidebarMenuButton>
										</TooltipTrigger>
										{!open && (
											<TooltipContent side="right" align="center">
												{item.tooltip}
											</TooltipContent>
										)}
									</Tooltip>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</nav>
		</SidebarContent>
	);
};
