import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/styles/Icons";
import type { RelatedActionsType, RelatedFormState } from "../../types";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useMemo, useState } from "react";
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
import { useArchiveContext } from "@/modules/archives/context/useArchiveContext";
import { DEFAULT_FORM_STATE_RELATED } from "@/hooks/useEnviromentArchives";
import { ErrorCollector } from "@/utils/ErrorCollector";
import { toast } from "sonner";
import {
	listRelatedSpecify,
	updateRelated,
} from "../../services/related.services";
import { useRelated } from "../../hooks/useRelated";
import { formatDateToISO } from "@/utils/FormatDate";
import { Calendar } from "@/components/ui/calendar";

export const EditRelatedDialog = ({
	open,
	archiveId,
	relatedDescription,
	relatedId,
	onClose,
}: RelatedActionsType) => {
	const [openCalendar, setOpenCalendar] = useState(false);
	const [selectedArchiveId, setSelectedArchiveId] = useState(archiveId);

	const { archiveSelect } = useArchiveContext();

	const { refreshRelated } = useRelated();

	const [formEdit, setFormEdit] = useState<RelatedFormState>(
		DEFAULT_FORM_STATE_RELATED,
	);

	// Recolector de errores
	const { handleApiError } = ErrorCollector();

	// Funcion que manda a editar un archivo
	const handleSubmitEdit = async () => {
		try {
			const payload = {
				description: formEdit.description,
				event_date: formEdit.event_date,
				responsible_person: formEdit.responsible_person,
				responsible_role: formEdit.responsible_role,
				notas: formEdit.notas,
			};

			const res = await updateRelated(selectedArchiveId, relatedId, payload);
			await refreshRelated();
			toast.success(res.message);
			onClose();
		} catch (error) {
			handleApiError(error);
		}
	};

	const onSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await handleSubmitEdit();
	};

	const selectedDate = useMemo(
		() =>
			formEdit.event_date
				? new Date(formEdit.event_date + "T00:00:00")
				: undefined,
		[formEdit.event_date],
	);

	const [currentMonth, setCurrentMonth] = useState<Date | undefined>(
		selectedDate,
	);

	// Efectos (Conseguir el registro que se le dio clic y sobnecargarlo al Dialog para editar)
	useEffect(() => {
		if (!open || !archiveId) return;

		if (open && archiveId) {
			setSelectedArchiveId(archiveId);
		}

		const getArchiveById = async () => {
			try {
				const res = await listRelatedSpecify(archiveId, relatedId);
				const related = res.data[0];

				if (related) {
					setFormEdit({
						description: related.description ?? "",
						event_date: related.event_date.split("T")[0] ?? "",
						responsible_person: related.responsible_person ?? "",
						responsible_role: related.responsible_role ?? "",
						notas: related.notas ?? "",
					});
				} else {
					toast.error(`No se encontró el archivo con ID ${archiveId}`);
					onClose();
				}
			} catch (error) {
				handleApiError(error);
			}
		};

		getArchiveById();
	}, [archiveId, onClose, open, handleApiError, relatedId]);

	useEffect(() => {
		if (selectedDate) {
			setCurrentMonth(selectedDate);
		}
	}, [selectedDate]);

	return (
		<>
			{/* Dialog para editar una relacion */}
			<Dialog open={open} onOpenChange={(v) => !v && onClose()}>
				<DialogOverlay />
				<DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl">
							Editar la relacion {relatedDescription}
						</DialogTitle>
						<DialogDescription>
							Edite la informacion de la relacion, los campos se pueden cambiar
							o dejarse asi, solo no deben de quedar vacios
						</DialogDescription>
					</DialogHeader>

					<form onSubmit={onSubmitEdit} className="space-y-6 py-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2 col-span-2">
								<Label
									htmlFor="description"
									className="text-sm font-medium"
									id="description-by-label"
								>
									Descripcion
								</Label>
								<Input
									id="description"
									type="text"
									aria-labelledby="description-by-label"
									value={formEdit.description}
									onChange={(e) =>
										setFormEdit((prev) => ({
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
									Archivo a relacionar
								</Label>
								<Select
									value={selectedArchiveId}
									onValueChange={(value) => setSelectedArchiveId(value)}
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
									Persona responsable
								</Label>
								<Input
									id="responsible_person"
									type="text"
									value={formEdit.responsible_person}
									onChange={(e) =>
										setFormEdit((prev) => ({
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
									value={formEdit.responsible_role}
									onValueChange={(value) =>
										setFormEdit((prev) => ({
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
								<Popover open={openCalendar} onOpenChange={setOpenCalendar}>
									<PopoverTrigger asChild className="w-full">
										<Button
											variant="outline"
											id="date"
											className="justify-between font-normal"
										>
											{formEdit.event_date || "Selecciona una fecha"}
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
											month={currentMonth}
											onMonthChange={setCurrentMonth}
											captionLayout="dropdown"
											onSelect={(selectedDate) => {
												if (!selectedDate) return;
												setFormEdit((prev) => ({
													...prev,
													event_date: formatDateToISO(selectedDate),
												}));

												setOpenCalendar(false);
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
									value={formEdit.notas}
									onChange={(e) =>
										setFormEdit((prev) => ({
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
								<Button
									variant="outline"
									type="button"
									className="cursor-pointer"
								>
									Cancelar
								</Button>
							</DialogClose>
							<Button type="submit" className="cursor-pointer">
								<Icons.Save className="h-4 w-4 mr-2" />
								Editar relacion
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
