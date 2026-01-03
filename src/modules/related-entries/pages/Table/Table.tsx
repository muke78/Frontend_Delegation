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

export const TableApp = () => {
	const related = [
		{
			"related_entries_id": "7e7077a8-0101-41f3-9790-c5ab386766ad",
			"archive_id": "9e0d796e-ac33-485f-b8ac-5a79089a658a",
			"reference_number": 1,
			"reference_folio": "OEMDYCCDC252801",
			"description": "SOLICITUD DE PROTECCION CIVIL",
			"event_date": "2025-05-02T06:00:00.000Z",
			"responsible_person": "Erick",
			"responsible_role": "Mary",
			"notas": "Se hace una solicitud",
			"created": "2025-12-30T09:03:56.000Z",
			"updated": "2025-12-30T09:03:56.000Z"
		},
		{
			"related_entries_id": "14bdd0b8-9fff-4b1d-8aa8-af3c46639535",
			"archive_id": "9e0d796e-ac33-485f-b8ac-5a79089a658a",
			"reference_number": 2,
			"reference_folio": "OEMDYCCDC252802",
			"description": "SOLICITUD DE PROTECCION CIVIL",
			"event_date": "2025-05-02T06:00:00.000Z",
			"responsible_person": "Erick",
			"responsible_role": "Mary",
			"notas": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos cupiditate est laboriosam nam alias odio officiis exercitationem. Magnam sapiente itaque minima nihil laborum adipisci placeat accusamus, quos facilis similique aperiam alias maiores incidunt quibusdam quas cupiditate saepe aliquid nostrum? Voluptate vel dolorem ducimus corporis doloribus aperiam? Culpa aliquid asperiores odit ducimus eum fuga accusantium delectus, totam veniam suscipit vitae amet ullam aut expedita consectetur numquam, tenetur debitis reiciendis dicta quaerat laudantium magni minima laborum nobis. Necessitatibus accusamus, dolores iure nostrum sint ex, illo similique quas nam a beatae labore. Ut quo, voluptatum laborum quos quam similique tempora fuga sed. Necessitatibus placeat cumque, eum quia in labore sequi quas nemo! Quae sapiente minima doloremque! Illo mollitia impedit eaque ipsam totam aliquid fugit aperiam dignissimos autem architecto vel velit maxime, eligendi porro amet illum debitis ratione repellat natus doloremque et expedita. Incidunt deleniti delectus atque facere reprehenderit provident, laboriosam pariatur vel repellat esse ullam nisi rerum repudiandae consectetur ducimus animi assumenda earum, similique tenetur reiciendis velit laudantium corrupti neque harum. Atque veniam facere, deserunt distinctio rem illo dicta deleniti natus dolorem quia obcaecati, quod repellendus reiciendis facilis assumenda error. Soluta omnis suscipit reiciendis, ea mollitia nemo? Voluptate deserunt hic nemo odit possimus?",
			"created": "2025-12-30T09:12:20.000Z",
			"updated": "2025-12-31T07:39:09.000Z"
		},
		{
			"related_entries_id": "b57e9c13-ab6d-4a9f-97ba-08556479be10",
			"archive_id": "9e0d796e-ac33-485f-b8ac-5a79089a658a",
			"reference_number": 3,
			"reference_folio": "OEMDYCCDC252803",
			"description": "SOLICITUD DE PROTECCION CIVIL",
			"event_date": "2025-05-02T06:00:00.000Z",
			"responsible_person": "Erick",
			"responsible_role": "Mary",
			"notas": "Se hace una solicitud",
			"created": "2025-12-30T09:12:21.000Z",
			"updated": "2025-12-30T09:12:21.000Z"
		},
	];

	return (
		<div className="w-full space-y-4">
			{/* COmponente de limite de conteo */}

			<div className="rounded-lg border overflow-hidden">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/50">
								<TableHead className="font-semibold">Número</TableHead>
								<TableHead className="font-semibold">Folio</TableHead>
								<TableHead className="font-semibold">Descripción</TableHead>
								<TableHead className="font-semibold">Fecha</TableHead>
								<TableHead className="font-semibold">Responsable</TableHead>
								<TableHead className="font-semibold">Cargo</TableHead>
								<TableHead className="font-semibold">Notas</TableHead>
								<TableHead className="font-semibold text-right">
									Acciones
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{related.map((rltd) => (
								<TableRow key={rltd.reference_number} className="hover:bg-primary/10">
									<TableCell className="font-mono text-sm font-medium">
										{rltd.reference_number}
									</TableCell>
									<TableCell className="font-mono text-sm">{rltd.reference_folio}</TableCell>
									<TableCell className="font-mono text-sm font-medium">{rltd.description}</TableCell>
									<TableCell className="font-mono text-sm font-medium">
										{rltd.event_date.split("T")[0]}
									</TableCell>
									<TableCell className="font-mono text-sm font-medium">
										{rltd.responsible_person}
									</TableCell>
									<TableCell className="font-mono text-sm">
										{rltd.responsible_role}
									</TableCell>
									<TableCell className="max-w-50 truncate">
										{rltd.notas}
									</TableCell>
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
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};
