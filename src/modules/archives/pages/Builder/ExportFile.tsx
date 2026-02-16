import { Button } from "@/components/ui/button";
import { Icons } from "@/styles/Icons";

export const ExportFile = () => {
	return (
		<Button className="gap-1.5 cursor-pointer bg-emerald-800 hover:bg-emerald-700 text-white">
			<Icons.Sheet />
			Exportar a xlsx
		</Button>
	);
};
