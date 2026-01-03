import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Icons } from "@/styles/Icons";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const FiltersApp = () => {
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(undefined);

	return (
		<FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
			{/* Descripcion */}

			<Field role="search">
				<FieldLabel htmlFor="description" className="text-sm font-medium">
					Descripcion
				</FieldLabel>
				<div className="relative">
					<Icons.Search
						aria-hidden="true"
						focusable="false"
						className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
						size={16}
					/>
					<Input
						id="description"
						type="search"
						value={""}
						onChange={() => {}}
						placeholder="Que se hizo?"
						className="pl-10"
					/>
				</div>
			</Field>

			{/* Persona responsable de la actividad */}
			<Field role="search">
				<FieldLabel
					htmlFor="responsible_person"
					className="text-sm font-medium"
				>
					Persona responsable
				</FieldLabel>
				<div className="relative">
					<Icons.Search
						aria-hidden="true"
						focusable="false"
						className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
						size={16}
					/>
					<Input
						id="responsible_person"
						type="search"
						value={""}
						onChange={() => {}}
						placeholder="Quien esta a cargo?"
						className="pl-10"
					/>
				</div>
			</Field>

			{/* Ver relaciones por archivo */}
			<Field role="search">
				<FieldLabel
					htmlFor="related_through"
					className="text-sm font-medium"
					id="file-type-label"
				>
					Relaciones por archivo
				</FieldLabel>
				<Select>
					<SelectTrigger
						id="related_through"
						className="cursor-pointer h-10"
						aria-labelledby="file-type-label"
					>
						<SelectValue placeholder="Selecciona un archivo" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Archivos</SelectLabel>
							<SelectItem value="9e0d796e-ac33-485f-b8ac-5a79089a658a">
								OEMDYCCDC2528
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</Field>

			{/* Fecha del evento */}
			<Field role="search">
				<FieldLabel htmlFor="event_date" className="text-sm font-medium">
					Fecha del evento
				</FieldLabel>
				<div className="flex flex-col gap-3">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								id="date"
								className="justify-between font-normal"
							>
								{date ? date.toLocaleDateString() : "Selecciona una fecha"}
								<Icons.ChevronDownIcon />
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className="w-auto overflow-hidden p-0"
							align="start"
						>
							<Calendar
								mode="single"
								selected={date}
								captionLayout="dropdown"
								onSelect={(date) => {
									setDate(date);
									setOpen(false);
								}}
							/>
						</PopoverContent>
					</Popover>
				</div>
			</Field>
		</FieldGroup>
	);
};
