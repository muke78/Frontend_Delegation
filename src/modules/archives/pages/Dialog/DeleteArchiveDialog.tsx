import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { UUID } from "../../types";
import { useArchiveContext } from "../../context/useArchiveContext";

type Props = {
  open: boolean
  archiveId?: UUID
  archiveName: string
  onClose: () => void
}

export const DeleteArchiveDialog = ({ open,
  archiveId,
  archiveName,
  onClose }: Props) => {

  const { handleDeleteArchive } = useArchiveContext()

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogOverlay />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Desea Borrar este registro?</DialogTitle>
          <DialogDescription>
            Al dar clic en aceptar, el registro {archiveName} sera eliminado de forma definitiva
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose} className="cursor-pointer">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant={"destructive"}
            className="cursor-pointer"
            onClick={async () => {
              if (!archiveId) {
                toast.error("ID del archivo no válido");
                return;
              }

              const ok = await handleDeleteArchive(archiveId);
              if (ok) onClose()
            }}
          >
            Aceptar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
