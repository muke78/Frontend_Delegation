import { useTheme } from "@/context/ThemeProvider";
import { Icons } from "@/styles/Icons.ts";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<Select
			value={theme}
			onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
		>
			<SelectTrigger className="w-32">
				<SelectValue placeholder="Tema" />
			</SelectTrigger>

			<SelectContent>
				<SelectItem value="light">
					<Icons.Sun />
					Light
				</SelectItem>
				<SelectItem value="dark">
					<Icons.Moon /> Dark
				</SelectItem>
				<SelectItem value="system">
					<Icons.Settings />
					System
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
