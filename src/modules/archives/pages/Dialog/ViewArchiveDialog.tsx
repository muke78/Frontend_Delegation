import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import type { UUID } from "../../types"
import { Button } from "@/components/ui/button"


type Props = {
  open: boolean
  archiveId?: UUID
  archiveName: string
  onClose: () => void
}

export const ViewArchiveDialog = ({ open, archiveId, archiveName, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogOverlay />
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Informacion acerca de {archiveName}</DialogTitle>
          <DialogDescription>
            Informacion sobre el archivo y sus referencias que tiene cargadas {archiveId}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose} className="cursor-pointer">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant={"default"}>
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
