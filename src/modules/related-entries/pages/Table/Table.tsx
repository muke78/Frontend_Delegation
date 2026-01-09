import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Icons } from "@/styles/Icons";
import { useRelatedContext } from "../../context/useRelatedContext";
import { CountLimit } from "@/components/layout/Filters/CountLimit";
import { PagintationApp } from "@/components/layout/Pagination/Pagintation";
import { FullScreenLoader } from "@/components/common/FullScreenLoader";
import { NotFoundTable } from "@/components/layout/NotFound/NotFoundTable";

export const TableApp = () => {
	const {
		loading,
		related,
		filters,
		paginationRelated,
		columnVisibility,
		handleLimitChange,
		handlePageChange,
	} = useRelatedContext();

	if (loading) return <FullScreenLoader message="Cargando..." />;

	return (
		<div className="w-full space-y-4">
			{/* Componente de limite de conteo */}
			<CountLimit
				pagination={paginationRelated}
				limit={filters.limit}
				onLimitChange={handleLimitChange}
			/>
			<div className="rounded-lg border overflow-hidden">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/50">
								{columnVisibility.reference_number && (
									<TableHead className="font-semibold">
										Número de referencia
									</TableHead>
								)}
								{columnVisibility.reference_folio && (
									<TableHead className="font-semibold">Folio</TableHead>
								)}
								{columnVisibility.description && (
									<TableHead className="font-semibold">Descripción</TableHead>
								)}
								{columnVisibility.event_date && (
									<TableHead className="font-semibold">
										Fecha del evento
									</TableHead>
								)}
								{columnVisibility.responsible_person && (
									<TableHead className="font-semibold">
										Persona responsable
									</TableHead>
								)}
								{columnVisibility.responsible_role && (
									<TableHead className="font-semibold">
										Persona a cargo
									</TableHead>
								)}
								{columnVisibility.notas && (
									<TableHead className="font-semibold">Notas</TableHead>
								)}
								{columnVisibility.actions && (
									<TableHead className="font-semibold text-right">
										Acciones
									</TableHead>
								)}
							</TableRow>
						</TableHeader>
						<TableBody>
							{related.length === 0 ? (
								<TableRow>
									<NotFoundTable
										spaceColSpan={
											Object.values(columnVisibility).filter(Boolean).length
										}
										subtitle="No se encontraron relaciones"
										description=" Intenta ajustar los filtros o agrega una nueva relacion"
									/>
								</TableRow>
							) : (
								related.map((rltd) => (
									<TableRow
										key={rltd.related_entries_id}
										className="hover:bg-primary/10"
									>
										{columnVisibility.reference_number && (
											<TableCell className="font-mono text-sm font-medium">
												{rltd.reference_number}
											</TableCell>
										)}
										{columnVisibility.reference_folio && (
											<TableCell className="font-mono text-sm">
												{rltd.reference_folio}
											</TableCell>
										)}
										{columnVisibility.description && (
											<TableCell className="font-mono text-sm font-medium">
												{rltd.description}
											</TableCell>
										)}
										{columnVisibility.event_date && (
											<TableCell className="font-mono text-sm font-medium">
												{rltd.event_date.split("T")[0]}
											</TableCell>
										)}
										{columnVisibility.responsible_person && (
											<TableCell className="font-mono text-sm font-medium">
												{rltd.responsible_person}
											</TableCell>
										)}
										{columnVisibility.responsible_role && (
											<TableCell className="font-mono text-sm">
												{rltd.responsible_role}
											</TableCell>
										)}
										{columnVisibility.notas && (
											<TableCell className="max-w-50 truncate">
												{rltd.notas || "—"}
											</TableCell>
										)}
										{columnVisibility.actions && (
											<TableCell>
												<div className="flex items-center justify-end gap-1">
													<Button
														size={"sm"}
														variant={"ghost"}
														className="gap-1.5 cursor-pointer hover:bg-amber-50 hover:text-amber-600"
														title="Editar relacion"
													>
														<Icons.Pencil size={14} />
														<span className="hidden xl:inline">Editar</span>
													</Button>
													<Button
														size="sm"
														variant="ghost"
														className="gap-1.5 cursor-pointer text-destructive hover:bg-destructive/10"
														title="Eliminar relacion"
													>
														<Icons.Trash2 size={14} />
														<span className="hidden xl:inline">Eliminar</span>
													</Button>
												</div>
											</TableCell>
										)}
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</div>
			{paginationRelated && (
				<div className="flex justify-center">
					<PagintationApp
						pagination={paginationRelated}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
};
