import { Link } from "react-router-dom";

import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogTitle,
} from "@/components/ui/dialog";
import type { ArchiveActionsType } from "@/modules/archives/types.ts";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Icons } from "@/styles/Icons";
import { PagintationApp } from "@/components/layout/Pagination/Pagintation";
import { NotFoundTable } from "@/modules/archives/pages/Table/NotFoundTable.tsx";
import { useArchiveDuplex } from "@/modules/archives/hooks/useArchiveDuplex.ts";
import { CountLimit } from "@/modules/archives/pages/Filters/CountLimit.tsx";
import { FullScreenLoader } from "@/components/common/FullScreenLoader";

export const ViewArchiveDialog = ({
	open,
	archiveId,
	onClose,
}: ArchiveActionsType) => {
	const {
		loading,
		archiveView,
		relatedView,
		paginationViewDuplex,
		filtersDuplex,
		handlePageChange,
		handleLimitChange,
		clearDuplexParams,
	} = useArchiveDuplex({
		open,
		archiveId,
	});
	return (
		<Dialog
			open={open}
			onOpenChange={(v) => {
				if (!v) {
					clearDuplexParams();
					onClose();
				}
			}}
		>
			<DialogOverlay />
			<DialogContent className="max-w-7xl max-h-[93vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold">
						Información del archivo
					</DialogTitle>
					<DialogDescription>
						Detalle del archivo seleccionado y sus referencias asociadas
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					{/* === INFO ARCHIVO === */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle className="text-lg">
									Archivo {archiveView?.folio}
								</CardTitle>
								<CardDescription>{archiveView?.name}</CardDescription>
							</div>
							<CardAction>{/* aquí luego puedes meter botones */}</CardAction>
						</CardHeader>

						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
								<div>
									<p className="text-muted-foreground">Identificador</p>
									<p className="font-medium">{archiveView?.identifier}</p>
								</div>

								<div>
									<p className="text-muted-foreground">Folio base</p>
									<p className="font-medium">{archiveView?.base_folio}</p>
								</div>

								<div>
									<p className="text-muted-foreground">Tipo de documento</p>
									<p className="font-medium">{archiveView?.doc_type}</p>
								</div>

								<div>
									<p className="text-muted-foreground">Año</p>
									<p className="font-medium">{archiveView?.year}</p>
								</div>

								<div className="col-span-2">
									<p className="text-muted-foreground">
										Ruta de almacenamiento
									</p>
									<p className="font-medium break-all">
										{archiveView?.storage_path}
									</p>
								</div>

								<div>
									<p className="text-muted-foreground">Hoja origen</p>
									<p className="font-medium">{archiveView?.source_sheet}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* === REFERENCIAS === */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Referencias asociadas</CardTitle>
							<CardDescription>
								Registros vinculados a este archivo
							</CardDescription>
							<CardAction>
								{relatedView.length > 0 ? (
									<Link to="/related-entries">
										<Button variant={"ghost"} className="cursor-pointer">
											<Icons.SquareArrowOutUpRight />
											Ver mas detalles
										</Button>
									</Link>
								) : (
									<Link to="/related-entries?create=related">
										<Button variant={"ghost"} className="cursor-pointer">
											<Icons.Plus />
											Agrega una referencia
										</Button>
									</Link>
								)}
							</CardAction>
						</CardHeader>

						<CountLimit
							pagination={paginationViewDuplex}
							limit={filtersDuplex.r_limit}
							onLimitChange={handleLimitChange}
						/>
						<CardContent className="overflow-hidden">
							<div className="relative overflow-x-auto rounded-md border">
								{loading ? (
									<FullScreenLoader message="Cargando..." />
								) : (
									<Table>
										<TableHeader>
											<TableRow className="bg-muted/50">
												<TableHead className="font-semibold">Número</TableHead>
												<TableHead className="font-semibold">Folio</TableHead>
												<TableHead className="font-semibold">
													Descripción
												</TableHead>
												<TableHead className="font-semibold">Fecha</TableHead>
												<TableHead className="font-semibold">
													Responsable
												</TableHead>
												<TableHead className="font-semibold">Cargo</TableHead>
												<TableHead className="font-semibold">Notas</TableHead>
											</TableRow>
										</TableHeader>

										<TableBody>
											{relatedView.length > 0 ? (
												relatedView.map((reltd) => (
													<TableRow
														key={reltd.related_entries_id}
														className="hover:bg-primary/10"
													>
														<TableCell>{reltd.reference_number}</TableCell>
														<TableCell className="font-medium">
															{reltd.reference_folio}
														</TableCell>
														<TableCell className="max-w-62.5 truncate">
															{reltd.description}
														</TableCell>
														<TableCell>
															{reltd.event_date.split("T")[0]}
														</TableCell>
														<TableCell>{reltd.responsible_person}</TableCell>
														<TableCell>{reltd.responsible_role}</TableCell>
														<TableCell className="max-w-50 truncate">
															{reltd.notas || "—"}
														</TableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<NotFoundTable
														spaceColSpan={7}
														subtitle="No hay referencias asociadas a este archivo"
														description="Intenta cargar un nueva referencia"
													/>
												</TableRow>
											)}
										</TableBody>
									</Table>
								)}
							</div>
						</CardContent>
						{paginationViewDuplex && (
							<div className="flex justify-center">
								<PagintationApp
									pagination={paginationViewDuplex}
									onPageChange={handlePageChange}
								/>
							</div>
						)}
					</Card>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button onClick={onClose}>Cerrar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
