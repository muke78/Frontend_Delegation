import { Button } from "@/components/ui/button";
import { Icons } from "@/styles/Icons";
import { DeleteRelatedDialog } from "@/modules/related-entries/pages/Dialog/DeleteRelatedDialog";
import { EditRelatedDialog } from "@/modules/related-entries/pages/Dialog/EditRelatedDialog";
import { useState } from "react";
import type { RelatedEntry } from "../types";

export const RelatedActions = ({ related }: { related: RelatedEntry }) => {
	const [action, setAction] = useState<"edit" | "delete" | null>(null);

	return (
		<>
			<div className="flex items-center justify-end gap-1">
				<Button
					size="sm"
					variant="ghost"
					className="gap-1.5 cursor-pointer hover:bg-amber-50 hover:text-amber-600"
					title="Editar relacion"
					onClick={() => setAction("edit")}
				>
					<Icons.Pencil className="h-3.5 w-3.5" />
					<span className="hidden xl:inline">Editar</span>
				</Button>
				<Button
					size="sm"
					variant="ghost"
					className="gap-1.5 cursor-pointer text-destructive hover:bg-destructive/10"
					title="Eliminar relacion"
					onClick={() => setAction("delete")}
				>
					<Icons.Trash2 className="h-3.5 w-3.5" />
					<span className="hidden xl:inline">Eliminar</span>
				</Button>
			</div>

			{/* Componente de editar */}
			<EditRelatedDialog
				open={action === "edit"}
				archiveId={related.archive_id}
				relatedId={related.related_entries_id}
				relatedDescription={related.description}
				onClose={() => {
					setAction(null);
				}}
			/>

			{/* Componente de eliminar */}
			<DeleteRelatedDialog
				open={action === "delete"}
				archiveId={related.archive_id}
				relatedId={related.related_entries_id}
				relatedDescription={related.description}
				onClose={() => {
					setAction(null);
				}}
			/>
		</>
	);
};
