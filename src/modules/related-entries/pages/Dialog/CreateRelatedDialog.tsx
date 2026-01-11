import { Popover } from "@radix-ui/react-popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useArchiveContext } from "@/modules/archives/context/useArchiveContext.ts";
import { Icons } from "@/styles/Icons";
import { formatDateToISO } from "@/utils/FormatDate";
import { useRelatedContext } from "../../context/useRelatedContext";

export const CreateRelatedDialog = () => {
	const [open, setOpen] = useState(false);

	const { archiveSelect } = useArchiveContext();
	const {
		formCreate,
		setFormCreate,
		openDialog,
		setOpenDialog,
		handleSubmitCreate,
	} = useRelatedContext();

	const onSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await handleSubmitCreate();
	};

	const selectedDate = formCreate.event_date
		? new Date(`${formCreate.event_date}T00:00:00`)
		: undefined;

	return (
		<>
			{/* Dialogo para agrerar una relacion */}
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogTrigger asChild>
					<Button className="gap-2 cursor-pointer">
						<Icons.Plus className="h-4 w-4" />
						Agregar relacion
					</Button>
				</DialogTrigger>
				<DialogOverlay />
				<DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl">
							Agregar nueva relacion
						</DialogTitle>
						<DialogDescription>
							Complete la información de la relacion. Los campos marcados con{" "}
							<span className="text-destructive">*</span> son obligatorios.
						</DialogDescription>
					</DialogHeader>

					<form onSubmit={onSubmitCreate} className="space-y-6 py-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2 col-span-2">
								<Label
									htmlFor="description"
									className="text-sm font-medium"
									id="description-by-label"
								>
									Descripcion <span className="text-destructive">*</span>
								</Label>
								<Input
									id="description"
									type="text"
									aria-labelledby="description-by-label"
									value={formCreate.description}
									onChange={(e) =>
										setFormCreate((prev) => ({
											...prev,
											description: e.target.value.toUpperCase(),
										}))
									}
									placeholder="Que se va ha hacer?"
									required
								/>
							</div>

							<div className="space-y-2 col-span-2">
								<Label
									htmlFor="archive_id"
									className="text-sm font-medium"
									id="archive-by-label"
								>
									Archivo a relacionar{" "}
									<span className="text-destructive">*</span>
								</Label>
								<Select
									value={formCreate.archive_id}
									onValueChange={(value) =>
										setFormCreate((prev) => ({ ...prev, archive_id: value }))
									}
									required
								>
									<SelectTrigger
										id="archive_id"
										className="w-full cursor-pointer h-10"
										aria-labelledby="archive-by-label"
									>
										<SelectValue placeholder="Selecciona un archivo" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Archivos</SelectLabel>
											{archiveSelect.map((arch) => (
												<SelectItem key={arch.id} value={arch.id}>
													{arch.label}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2 col-span-2">
								<Label
									htmlFor="responsible_person"
									className="text-sm font-medium"
								>
									Persona responsable{" "}
									<span className="text-destructive">*</span>
								</Label>
								<Input
									id="responsible_person"
									type="text"
									value={formCreate.responsible_person}
									onChange={(e) =>
										setFormCreate((prev) => ({
											...prev,
											responsible_person: e.target.value.toUpperCase(),
										}))
									}
									placeholder="Quien esta a cargo?"
									required
								/>
							</div>

							<div className="space-y-2 col-span-2">
								<Label
									htmlFor="responsible_role"
									className="text-sm font-medium"
									id="created-by-label"
								>
									Persona a cargo
								</Label>
								<Select
									value={formCreate.responsible_role}
									onValueChange={(value) =>
										setFormCreate((prev) => ({
											...prev,
											responsible_role: value,
										}))
									}
								>
									<SelectTrigger
										id="responsible_role"
										className="w-full cursor-pointer h-10"
										aria-labelledby="created-by-label"
									>
										<SelectValue placeholder="Seleccionar usuario" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Usuarios</SelectLabel>
											<SelectItem value="Isela Angeles Cuandon Quijada">
												Isela Angeles Cuandon Quijada
											</SelectItem>
											<SelectItem value="0bab831b-3e92-4897-b641-cffc0dfe1d3f">
												erick
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2 col-span-2">
								<Label htmlFor="event_date" className="text-sm font-medium">
									Fecha de evento
								</Label>
								<Popover open={open} onOpenChange={setOpen}>
									<PopoverTrigger asChild className="w-full">
										<Button
											variant="outline"
											id="date"
											className="justify-between font-normal"
										>
											{formCreate.event_date || "Selecciona una fecha"}
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
												setFormCreate((prev) => ({
													...prev,
													event_date: formatDateToISO(selectedDate),
												}));

												setOpen(false);
											}}
										/>
									</PopoverContent>
								</Popover>
							</div>

							<div className="space-y-2 col-span-2">
								<Label htmlFor="notas" className="text-sm font-medium">
									Notas
								</Label>
								<Textarea
									id="notas"
									value={formCreate.notas}
									onChange={(e) =>
										setFormCreate((prev) => ({
											...prev,
											notas: e.target.value.toUpperCase(),
										}))
									}
									placeholder="Escribe tu nota aqui"
								/>
							</div>
						</div>

						<DialogFooter className="flex gap-2">
							<DialogClose asChild>
								<Button variant="outline" type="button">
									Cancelar
								</Button>
							</DialogClose>
							<Button type="submit">
								<Icons.Save className="h-4 w-4 mr-2" />
								Guardar relacion
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
