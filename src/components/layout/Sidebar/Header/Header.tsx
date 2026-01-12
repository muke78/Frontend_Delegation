/** biome-ignore-all lint/a11y/useAriaPropsSupportedByRole: <> */
import { SidebarHeader } from "@/components/ui/sidebar";
import { Icons } from "@/styles/Icons";

export const Header = ({ open }: { open: boolean }) => {
	return (
		<SidebarHeader>
			<header className="flex p-2" aria-label="Título de la aplicación">
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
	);
};
