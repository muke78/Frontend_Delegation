import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Icons } from "@/styles/Icons";
import { EditArchiveDialog } from "@/modules/archives/pages/Dialog/EditArchiveDialog.tsx";
import { ViewArchiveDialog } from "@/modules/archives/pages/Dialog/ViewArchiveDialog.tsx";
import { DeleteArchiveDialog } from "@/modules/archives/pages/Dialog/DeleteArchiveDialog.tsx";
import { useArchiveContext } from "@/modules/archives/context/useArchiveContext.ts";

import type { ArchiveBase } from "@/modules/archives/types.ts";

export const ArchiveActions = ({ archive }: { archive: ArchiveBase }) => {
	const { handleRebuildFolio } = useArchiveContext();
	const navigate = useNavigate();
	const location = useLocation();

	const [action, setAction] = useState<"dialog" | "edit" | "delete" | null>(
		null,
	);

	const params = new URLSearchParams(location.search);

	const openView =
		params.get("dialog") === "archive" &&
		params.get("archiveId") === archive.archives_id;

	return (
		<>
			<div className="flex items-center justify-end gap-1">
				<Button
					size="sm"
					variant="ghost"
					className="gap-1.5 cursor-pointer hover:bg-blue-50 hover:text-blue-600"
					title="Ver detalles"
					onClick={() => {
						const params = new URLSearchParams(location.search);

						params.set("dialog", "archive");
						params.set("archiveId", archive.archives_id);
						params.set("r_page", "1");
						params.set("r_limit", "20");

						navigate(`?${params.toString()}`);
					}}
				>
					<Icons.Eye className="h-3.5 w-3.5" />
					<span className="hidden xl:inline">Ver</span>
				</Button>

				<Button
					size="sm"
					variant="ghost"
					className="gap-1.5 cursor-pointer hover:bg-amber-50 hover:text-amber-600"
					title="Editar archivo"
					onClick={() => setAction("edit")}
				>
					<Icons.Pencil className="h-3.5 w-3.5" />
					<span className="hidden xl:inline">Editar</span>
				</Button>

				<Button
					size="sm"
					variant="ghost"
					className="gap-1.5 cursor-pointer hover:bg-emerald-50 hover:text-emerald-600"
					title="Reconstruir folio"
					onClick={() => handleRebuildFolio(archive.archives_id)}
				>
					<Icons.Blocks className="h-3.5 w-3.5" />
					<span className="hidden xl:inline">Reconstruir folio</span>
				</Button>

				<Button
					size="sm"
					variant="ghost"
					className="gap-1.5 cursor-pointer text-destructive hover:bg-destructive/10"
					title="Eliminar archivo"
					onClick={() => setAction("delete")}
				>
					<Icons.Trash2 className="h-3.5 w-3.5" />
					<span className="hidden xl:inline">Eliminar</span>
				</Button>
			</div>

			<ViewArchiveDialog
				open={openView}
				archiveId={archive.archives_id}
				archiveName={archive.name}
				onClose={() => {
					const params = new URLSearchParams(location.search);

					params.delete("dialog");
					params.delete("archiveId");
					params.delete("r_page");
					params.delete("r_limit");

					navigate(`?${params.toString()}`);
				}}
			/>

			<EditArchiveDialog
				open={action === "edit"}
				archiveId={archive.archives_id}
				archiveName={archive.name}
				onClose={() => setAction(null)}
			/>

			<DeleteArchiveDialog
				open={action === "delete"}
				archiveId={archive.archives_id}
				archiveName={archive.name}
				onClose={() => setAction(null)}
			/>
		</>
	);
};
