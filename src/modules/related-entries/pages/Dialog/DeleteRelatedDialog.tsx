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
import type { RelatedActionsType } from "../../types";
import { useRelatedContext } from "../../context/useRelatedContext";
import { toast } from "sonner";

export const DeleteRelatedDialog = ({
	open,
	archiveId,
	relatedId,
	relatedDescription,
	onClose,
}: RelatedActionsType) => {
	const { handleDeleteRelated } = useRelatedContext();

	const onDelete = async () => {
		if (!archiveId || !relatedId) {
			toast.error("Los ID's no son validos");
			return;
		}
		await handleDeleteRelated(archiveId, relatedId);
	};

	return (
		<Dialog open={open} onOpenChange={(v) => !v && onClose()}>
			<DialogOverlay />
			<DialogContent className="w-md">
				<DialogHeader>
					<DialogTitle>Desea Borrar este registro?</DialogTitle>
					<DialogDescription>
						Al dar clic en aceptar, el registro {relatedDescription} sera
						eliminado de forma definitiva
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							variant="outline"
							onClick={onClose}
							className="cursor-pointer"
						>
							Cancelar
						</Button>
					</DialogClose>
					<Button
						type="submit"
						variant={"destructive"}
						className="cursor-pointer"
						onClick={onDelete}
					>
						Aceptar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
