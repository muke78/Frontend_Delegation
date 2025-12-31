import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogOverlay,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/styles/Icons";
import { useArchiveContext } from "@/modules/archives/context/useArchiveContext.ts";

export const CreateArchiveDialog = () => {
	const {
		formCreate,
		setFormCreate,
		openDialog,
		setOpenDialog,
		handleSubmitCreate,
	} = useArchiveContext();

	const onSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await handleSubmitCreate();
	};

	return (
		<>
			{/* Dialog para agregar archivo */}
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogTrigger asChild>
					<Button className="gap-2 cursor-pointer">
						<Icons.Plus className="h-4 w-4" />
						Agregar archivo
					</Button>
				</DialogTrigger>
				<DialogOverlay />
				<DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-2xl">
							Agregar nuevo archivo
						</DialogTitle>
						<DialogDescription>
							Complete la información del archivo. Los campos marcados con{" "}
							<span className="text-destructive">*</span> son obligatorios.
						</DialogDescription>
					</DialogHeader>

					<form onSubmit={onSubmitCreate} className="space-y-6 py-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="identifier" className="text-sm font-medium">
									Identificador <span className="text-destructive">*</span>
								</Label>
								<Input
									id="identifier"
									type="text"
									value={formCreate.identifier}
									onChange={(e) =>
										setFormCreate((prev) => ({
											...prev,
											identifier: e.target.value.toUpperCase(),
										}))
									}
									placeholder="ABC"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="base_folio" className="text-sm font-medium">
									Base <span className="text-destructive">*</span>
								</Label>
								<Input
									id="base_folio"
									type="text"
									value={formCreate.base_folio}
									onChange={(e) =>
										setFormCreate((prev) => ({
											...prev,
											base_folio: e.target.value.toUpperCase(),
										}))
									}
									placeholder="DYCCDC2528"
									required
								/>
							</div>

							<div className="space-y-2 md:col-span-2">
								<Label htmlFor="name" className="text-sm font-medium">
									Nombre del archivo <span className="text-destructive">*</span>
								</Label>
								<Input
									id="name"
									type="text"
									value={formCreate.name}
									onChange={(e) =>
										setFormCreate((prev) => ({
											...prev,
											name: e.target.value.toUpperCase(),
										}))
									}
									placeholder="Ingrese el nombre del archivo"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="doc_type_create"
									className="text-sm font-medium"
								>
									Tipo de documento
								</Label>
								<Select
									value={formCreate.doc_type}
									onValueChange={(value) =>
										setFormCreate((prev) => ({ ...prev, doc_type: value }))
									}
								>
									<SelectTrigger id="doc_type_create" className="w-full">
										<SelectValue placeholder="Seleccionar tipo de documento" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Excel">Excel</SelectItem>
										<SelectItem value="PDF">PDF</SelectItem>
										<SelectItem value="Word">Word</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="year" className="text-sm font-medium">
									Año <span className="text-destructive">*</span>
								</Label>
								<Input
									id="year"
									type="number"
									value={formCreate.year}
									onChange={(e) =>
										setFormCreate((prev) => ({ ...prev, year: e.target.value }))
									}
									placeholder="YYYY"
									required
								/>
							</div>

							<div className="space-y-2 md:col-span-2">
								<Label htmlFor="storage_path" className="text-sm font-medium">
									Ruta de almacenamiento
								</Label>
								<Input
									id="storage_path"
									type="text"
									value={formCreate.storage_path}
									onChange={(e) =>
										setFormCreate((prev) => ({
											...prev,
											storage_path: e.target.value,
										}))
									}
									placeholder="/ruta/del/archivo"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="source_sheet" className="text-sm font-medium">
									Hoja fuente
								</Label>
								<Input
									id="source_sheet"
									type="text"
									value={formCreate.source_sheet}
									onChange={(e) =>
										setFormCreate((prev) => ({
											...prev,
											source_sheet: e.target.value,
										}))
									}
									placeholder="Hoja 1"
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
								Guardar archivo
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
