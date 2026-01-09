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
import { useRelatedContext } from "../../context/useRelatedContext";
import { formatDateToISO } from "@/utils/FormatDate";

export const FiltersApp = () => {
	const [open, setOpen] = useState(false);

	const { filters, setFilters } = useRelatedContext();
	
	const selectedDate = filters.event_date
		? new Date(`${filters.event_date}T00:00:00`)
		: undefined;

	return (
		<FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
			{/* Folio de referencia */}
			<Field role="search">
				<FieldLabel htmlFor="folio" className="text-sm font-medium">
					Folio
				</FieldLabel>
				<div className="relative">
					<Icons.Search
						aria-hidden="true"
						focusable="false"
						className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
						size={16}
					/>
					<Input
						id="folio"
						type="search"
						value={filters.reference_folio}
						onChange={(e) =>
							setFilters((prev) => ({
								...prev,
								reference_folio: e.target.value.toUpperCase(),
							}))
						}
						placeholder="ABC"
						className="pl-10"
					/>
				</div>
			</Field>

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
						value={filters.description}
						onChange={(e) =>
							setFilters((prev) => ({
								...prev,
								description: e.target.value.toUpperCase(),
							}))
						}
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
						value={filters.responsible_person}
						onChange={(e) =>
							setFilters((prev) => ({
								...prev,
								responsible_person: e.target.value.toUpperCase(),
							}))
						}
						placeholder="Quien esta a cargo?"
						className="pl-10"
					/>
				</div>
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
								{filters.event_date || "Selecciona una fecha"}
								<Icons.ChevronDownIcon />
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className="w-auto overflow-hidden p-0"
							align="start"
						>
							<Calendar
								mode="single"
								selected={selectedDate}
								month={selectedDate}
								captionLayout="dropdown"
								onSelect={(selectedDate) => {
									if (!selectedDate) return;
									setFilters((prev) => ({
										...prev,
										event_date: formatDateToISO(selectedDate),
									}));

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
